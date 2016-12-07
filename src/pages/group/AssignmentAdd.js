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
            <div className='col-md-6 col-md-offset-3'>
                <h5>Tambah Tugas</h5>
                <NewAssignmentForm />
            </div>
            <div style={{clear: 'both'}}></div>
            </div>
        )
    }
}

AssignmentAdd.contextTypes = {
    group: React.PropTypes.object,
    groupId: React.PropTypes.string,
    router: React.PropTypes.object
}

export default AssignmentAdd
