import React from 'react'
import MemberService from '../../api/member'
import { connect } from 'react-redux'
import { fetchMembers } from '../../actions/member'
import MemberList from '../../components/group/MemberList'
import InviteMemberForm from '../../components/group/InviteMemberForm'

class Members extends React.Component {
    componentDidMount() {
        this.props.fetchMembers(this.context.groupId);
    }
    kick(nim) {
        MemberService(this.context.groupId)
            .kick(nim)
            .then(r => {
                this.props.fetchMembers(this.context.groupId);
                this.context.showSnackbar(
                    `${nim} berhasil dihapus.`
                )
            })
    }
    render () {
        const members = this.props.members.items[this.context.groupId];
        if (members && members.length) {
            var renderMembers = (
                <MemberList
                    kick={this.kick.bind(this)}
                    members={members} />
            )
        } else if (members && !members.length) {
            var renderMembers = <span>No members</span>
        } else {
            var renderMembers = <span>Loading...</span>
        }
        return (
            <div>
                <InviteMemberForm />
                {renderMembers}
            </div>
        )
    }
}

Members.contextTypes = {
    groupId: React.PropTypes.string,
    showSnackbar: React.PropTypes.func
}

const mapStateToProps = state => ({
    members: state.members
})

const mapDispatchToProps = dispatch => ({
    fetchMembers: (groupId) => {
        dispatch(fetchMembers(groupId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Members)
