import React from 'react'
import AssignmentService from '../../../api/assignment'
import AssignmentItem from './AssignmentItem'

class AssignmentList extends React.Component {
    deleteItem(assignmentId) {
        AssignmentService(this.context.groupId)
            .delete(assignmentId)
            .then(r => {
                this.context.store.dispatch({
                    type: 'ASSIGNMENT_DELETE',
                    groupId: this.context.groupId,
                    id: assignmentId
                })
                this.context.showSnackbar('Berhasil dihapus.')
            })
    }
    render() {
        var renderAssignment = this.props.assignments.map(a => {
            return (
                <div key={a.id}>
                    <AssignmentItem assignment={a} deleteItem={this.deleteItem.bind(this)} />
                </div>
            )
        })

        return (
            <div>
                <div>{renderAssignment}</div>
            </div>
        )
    }
}

AssignmentList.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object,
    showSnackbar: React.PropTypes.func
}

export default AssignmentList
