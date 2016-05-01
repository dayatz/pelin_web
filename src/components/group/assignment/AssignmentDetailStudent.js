import React from 'react'
import { connect } from 'react-redux'
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
            const submitted = this.props.submits.items[this.context.assignmentId]
            var renderSubmitted
            if (submitted) {
                const filename = submitted.file.split('/')[submitted.file.split('/').length - 1]
                renderSubmitted = (
                    <div>
                        <p>{submitted.text} <a href={submitted.file}>{filename}</a></p>
                    </div>
                )
            }
            return (
                <div>
                    <b>Anda telah mengumpulkan tugas ini</b>
                    {renderSubmitted}
                </div>
            )
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
    assignmentId: React.PropTypes.string,
    assignment: React.PropTypes.object
}

const stateToProps = state => ({
    submits: state.submits
})

export default connect(stateToProps, null)(AssignmentDetailStudent)
