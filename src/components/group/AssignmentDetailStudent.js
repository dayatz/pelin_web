import React from 'react';

class AssignmentDetailStudent extends React.Component {
    renderSubmitAssignmentForm() {
        if (this.context.assignment.is_passed) {
            return (
            <span>Tugas ini sudah lewat batas pengumpulan.</span>
            )
        }
        return (
        <span>render form submit here</span>
        )
    }
    render() {
        return (
        <div>{this.renderSubmitAssignmentForm()}</div>
        )
    }
}

AssignmentDetailStudent.contextTypes = {
    assignment: React.PropTypes.object
}

export default AssignmentDetailStudent
