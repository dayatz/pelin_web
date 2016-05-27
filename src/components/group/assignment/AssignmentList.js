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
    editAssignment(assignmentId) {
        this.context.router.push(`/groups/${this.context.groupId}/assignments/${assignmentId}/edit`)
    }
    assignmentDetail(assignmentId) {
        this.context.router.push(`/groups/${this.context.groupId}/assignments/${assignmentId}`)
    }
    render() {
        var renderAssignment = this.props.assignments.map(a => {
            return (
                <AssignmentItem
                    key={a.id}
                    assignment={a}
                    deleteItem={this.deleteItem.bind(this)}
                    editAssignment={this.editAssignment.bind(this)}
                    assignmentDetail={this.assignmentDetail.bind(this)} />
            )
        })

        return (
            <div className='assignment-list'>
                {renderAssignment}
                <div style={{clear:'both'}}></div>
            </div>
        )
    }
}

AssignmentList.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object,
    router: React.PropTypes.object,
    showSnackbar: React.PropTypes.func
}

export default AssignmentList
