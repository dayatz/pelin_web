import React from 'react'
import { connect } from 'react-redux'
import AssignmentList from '../../components/group/assignment/AssignmentList'
import FabAdd from '../../components/FabAdd'
import { fetchAllAssignment } from '../../actions/assignment'

class Assignments extends React.Component {
    componentDidMount() {
        this.props.fetchAllAssignment(this.context.groupId);
    }

    render () {
        const assignments = this.props.assignments.items[this.context.groupId];
        if (assignments && assignments.length) {
            var renderAssignmentList = <AssignmentList assignments={assignments} />
        } else if (assignments && !assignments.length) {
            var renderAssignmentList = <span>No assignments</span>
        } else {
            var renderAssignmentList = <span>Loading...</span>
        }

        var renderAddButton;
        if (this.context.group.is_owner) {
            renderAddButton = (
                <FabAdd onClick={() => {
                    this.context.router.push(
                        `/groups/${this.context.groupId}/assignments/add`
                        )
                }} />
            )
        }

        return (
            <div>
                {renderAddButton}
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
    groupId: React.PropTypes.string,
    group: React.PropTypes.object,
    router: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);
