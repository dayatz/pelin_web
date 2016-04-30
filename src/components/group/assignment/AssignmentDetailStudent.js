import React from 'react'
import AssignmentSubmitForm from './AssignmentSubmitForm'

class AssignmentDetailStudent extends React.Component {
    renderSubmitAssignmentForm() {
        if (this.context.assignment.is_passed) {
            return (
            <span>Tugas ini sudah lewat batas pengumpulan.</span>
            )
        }
        return (
            <AssignmentSubmitForm />
        )
    }
    isSubmitted() {
        if (this.context.assignment.is_submitted) {
            return <b>You have been submitted this assignment</b>
        }
        return
    }
    render() {
        return (
        <div>
            {this.isSubmitted()}
            {this.renderSubmitAssignmentForm()}
        </div>
        )
    }
}

AssignmentDetailStudent.contextTypes = {
    assignment: React.PropTypes.object
}

export default AssignmentDetailStudent
