import React from 'react'
import NewAssignmentForm from '../../components/group/assignment/NewAssignmentForm'

class AssignmentAdd extends React.Component {
    componentWillMount() {
        if (!this.context.group.is_owner) {
            this.context.router.replace(`/groups/${this.context.groupId}/assignments`)
        }
    }
    render () {
        return (
            <div>
                <h5>Tambah Tugas</h5>
                <NewAssignmentForm />
            </div>
        )
    }
}

AssignmentAdd.contextTypes = {
    group: React.PropTypes.object,
    groupId: React.PropTypes.string,
    router: React.PropTypes.object
}

export default AssignmentAdd;
