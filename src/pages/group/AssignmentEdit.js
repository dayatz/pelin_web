import React from 'react'
import NewAssignmentForm from '../../components/group/assignment/NewAssignmentForm'

class AssignmentEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            assignmentId: this.props.params.assignmentId
        }
    }
    componentWillMount() {
        if (!this.context.group.is_owner) {
            this.context.router.replace(`/groups/${this.context.groupId}/assignments`)
        }
    }
    render () {
        return (
            <div>
                <h5>Edit Tugas</h5>
                <NewAssignmentForm assignment={this.context.assignment} />
            </div>
        )
    }
}

AssignmentEdit.contextTypes = {
    group: React.PropTypes.object,
    groupId: React.PropTypes.string,
    router: React.PropTypes.object,
    assignment: React.PropTypes.object
}

export default AssignmentEdit;
