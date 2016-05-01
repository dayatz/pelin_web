import React from 'react'
import { connect } from 'react-redux'
import { submitAddAction } from '../../../actions/assignment'
import AssignmentService from '../../../api/assignment'
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
                var filename = submitted.file.split('/')
                filename = filename[filename.length - 1]
                renderSubmitted = (
                    <div>
                        <p>{submitted.text} <a href={submitted.file}>{filename}</a></p>
                    </div>
                )
            } else {
                AssignmentService(this.context.groupId)
                    .fetchSubmitted(this.context.assignmentId)
                    .then(r => {
                        this.props.submitAdd(this.context.assignmentId, r.data)
                    })
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
    groupId: React.PropTypes.string,
    assignmentId: React.PropTypes.string,
    assignment: React.PropTypes.object
}

const stateToProps = state => ({
    submits: state.submits
})

const dispatchToProps = dispatch => ({
    submitAdd: (assignmentId, item) => {
        dispatch(submitAddAction(assignmentId, item))
    }
})

export default connect(stateToProps, dispatchToProps)(AssignmentDetailStudent)
