import React from 'react'
import { connect } from 'react-redux'
import AssignmentList from '../../components/group/AssignmentList'
import { fetchAllAssignment } from '../../actions/assignment'

class Assignments extends React.Component {
    componentDidMount() {
        this.props.fetchAllAssignment(this.context.groupId);
    }

    render () {
        const groupAssignment = this.props.assignments.items[this.context.groupId];
        if (groupAssignment && groupAssignment.length) {
            var renderAssignmentList = <AssignmentList assignments={groupAssignment} />
        } else if (groupAssignment && !groupAssignment.length) {
            var renderAssignmentList = <span>No assignments</span>
        } else {
            var renderAssignmentList = <span>Loading...</span>
        }
        return (
            <div>
                {renderAssignmentList}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    assignments: state.assignments
})

const mapDispatchToProps = dispatch => ({
    fetchAllAssignment: (groupId) => {
        dispatch(fetchAllAssignment(groupId));
    }
})

Assignments.contextTypes = {
    groupId: React.PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);
