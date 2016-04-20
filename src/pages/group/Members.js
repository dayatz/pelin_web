import React from 'react'
import { connect } from 'react-redux'
import { fetchMembers } from '../../actions/member'
import MemberList from '../../components/group/MemberList'

class Members extends React.Component {
    componentDidMount() {
        console.log('[Members] mounted');
        this.props.fetchMembers(this.context.groupId);
    }
    render () {
        const members = this.props.members.items[this.context.groupId];
        if (members && members.length) {
            var renderMembers = <MemberList members={members} />
        } else if (members && !members.length) {
            var renderMembers = <span>No members</span>
        } else {
            var renderMembers = <span>Loading...</span>
        }
        return (
            <div>
                {renderMembers}
            </div>
        )
    }
}

Members.contextTypes = {
    groupId: React.PropTypes.string
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
