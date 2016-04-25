import React from 'react'
import MemberService from '../../api/member'
import { connect } from 'react-redux'
import { fetchMembers, fetchPendings, kickMember } from '../../actions/member'
import MemberList from '../../components/group/MemberList'
import PendingList from '../../components/group/PendingList'
import InviteMemberForm from '../../components/group/InviteMemberForm'

class Members extends React.Component {
    componentDidMount() {
        this.props.fetchMembers(this.context.groupId);

        if (this.context.group.is_owner) {
            this.props.fetchPendings(this.context.groupId);
        }
    }
    kick(member) {
        MemberService(this.context.groupId)
            .kick(member.student.nim)
            .then(r => {
                this.props.kickMember(this.context.groupId, member.id);
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
                    this.context.showSnackbar(`${nim} berhasil ditambahkan.`);
                    this.props.fetchMembers(this.context.groupId);
                } else {
                    this.context.showSnackbar('Tunggu konfirmasi dari dosen.');
                }
                clean();
            })
            .catch(error => {
                if (error.status == 400) {
                    if (error.data.error.indexOf('Already') > -1) {
                        this.context.showSnackbar(`${nim} sudah menjadi member.`)
                    } else {
                        this.context.showSnackbar('Sedang menunggu konfirmasi dosen.');
                    }
                } else if (error.status == 404) {
                    this.context.showSnackbar(`${nim} tidak ditemukan.`);
                }
                clean();
            });
    }
    render () {
        const members = this.props.members.items[this.context.groupId];
        var renderMembers = <span>Loading...</span>;
        if (members && members.length) {
            renderMembers = (
                <MemberList
                    kick={this.kick.bind(this)}
                    members={members} />
            )
        } else {
            renderMembers = <span>No members</span>
        }

        var renderPendings;
        if (this.context.group.is_owner) {
            const pendings = this.props.pendings.items[this.context.groupId];
            renderPendings = <span>Loading...</span>;
            if (pendings && pendings.length) {
                renderPendings = (
                    <div>
                        <hr />
                        <p>Persetujuan bergabung</p>
                        <PendingList pendings={pendings} />
                        <hr />
                    </div>
                )
            } else {
                renderPendings = ''
            }
        }

        return (
            <div>
                <InviteMemberForm onInviteFormSubmit={this.onInviteFormSubmit.bind(this)} />
                {renderPendings}
                {renderMembers}
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
