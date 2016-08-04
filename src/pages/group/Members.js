import React from 'react'
import { connect } from 'react-redux'
import Popover from 'material-ui/lib/popover/popover'
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top'
import MemberList from '../../components/group/member/MemberList'
import PendingList from '../../components/group/member/PendingList'
import InviteMemberForm from '../../components/group/member/InviteMemberForm'
import FabAdd from '../../components/FabAdd'
import Loading from '../../components/Loading'
import Help from '../../components/Help'

import MemberService from '../../api/member'
import { fetchMembers, fetchPendings, kickMember } from '../../actions/member'

class Members extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            openPopover: false
        }
    }
    componentDidMount() {
        this.props.fetchMembers(this.context.groupId)

        if (this.context.group.is_owner) {
            this.props.fetchPendings(this.context.groupId)
        }
    }
    kick(member) {
        MemberService(this.context.groupId)
            .kick(member.student.nim)
            .then(r => {
                this.props.kickMember(this.context.groupId, member.id)
                this.context.showSnackbar(
                    `${member.student.nim} berhasil dihapus.`
                )
            })
    }
    onInviteFormSubmit(nim, clean) {
        MemberService(this.context.groupId)
            .invite(nim)
            .then(r => {
                if (r.status == 201) {
                    this.context.showSnackbar(`${nim} berhasil ditambahkan.`)
                    this.props.fetchMembers(this.context.groupId)
                } else {
                    this.context.showSnackbar('Tunggu konfirmasi dari dosen.')
                }
                clean()
                this.handleRequestClose()
            })
            .catch(error => {
                if (error.status == 400) {
                    if (error.data.error.indexOf('Already') > -1) {
                        this.context.showSnackbar(`${nim} sudah menjadi member.`)
                    } else {
                        this.context.showSnackbar('Sedang menunggu konfirmasi dosen.')
                    }
                } else if (error.status == 404) {
                    this.context.showSnackbar(`${nim} tidak ditemukan.`)
                }
                clean()
            })
    }
    onTouchTap(event) {
        this.setState({
            openPopover: true,
            anchorEl: event.currentTarget
        })
    }
    handleRequestClose() {
        this.setState({
            openPopover: false
        })
    }
    render () {
        const members = this.props.members.items[this.context.groupId]
        var renderMembers = <Loading />
        if (members && members.length) {
            renderMembers = (
                <MemberList
                    kick={this.kick.bind(this)}
                    members={members} />
            )
        } else {
            renderMembers = <div className='member-list'>Belum ada member</div>
        }

        var renderPendings
        if (this.context.group.is_owner) {
            const pendings = this.props.pendings.items[this.context.groupId]
            renderPendings = <span>Loading...</span>
            if (pendings && pendings.length) {
                renderPendings = (
                    <PendingList pendings={pendings} />
                )
            } else {
                renderPendings = ''
            }
        }

        return (
            <div>
                <Help text='Ini adalah halaman daftar member di group, untuk mengundang mahasiswa lain silahkan klik tombol tambah.' />
                <Popover
                    style={{padding: '0 10px'}}
                    open={this.state.openPopover}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose.bind(this)}
                    animation={PopoverAnimationFromTop}>
                    <InviteMemberForm
                        open={this.state.openPopover}
                        onInviteFormSubmit={this.onInviteFormSubmit.bind(this)} />
                </Popover>
                <FabAdd className='lesson-add-fab' onTouchTap={this.onTouchTap.bind(this)} />
                
                {renderPendings}
                {renderMembers}
                <div style={{clear:'both'}}></div>
            </div>
        )
    }
}

Members.contextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object,
    showSnackbar: React.PropTypes.func
}

const mapStateToProps = state => ({
    members: state.members,
    pendings: state.pendings
})

const mapDispatchToProps = dispatch => ({
    fetchMembers: (groupId) => {
        dispatch(fetchMembers(groupId))
    },
    fetchPendings: (groupId) => {
        dispatch(fetchPendings(groupId))
    },
    kickMember: (groupId, memberId) => {
        dispatch(kickMember(groupId, memberId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Members)
