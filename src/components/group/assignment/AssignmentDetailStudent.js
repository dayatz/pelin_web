import React from 'react'
import { connect } from 'react-redux'

import Paper from 'material-ui/lib/paper'
import Avatar from 'material-ui/lib/avatar'
import FontIcon from 'material-ui/lib/font-icon'

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
                    <span>
                        <p className='assignment-info__text'>{submitted.text}</p>
                        <a className='post-item__attachment' href={submitted.file} target='_blank'>
                            <Avatar size={24} style={{ marginRight: 5 }}>
                                <FontIcon style={{ fontSize: 14, color: '#757575' }} className='material-icons'>attach_file</FontIcon>
                            </Avatar>
                            <span style={{ fontSize: 13 }}>{filename}</span>
                        </a>
                    </span>
                )
            } else {
                AssignmentService(this.context.groupId)
                    .fetchSubmitted(this.context.assignmentId)
                    .then(r => {
                        this.props.submitAdd(this.context.assignmentId, r.data)
                    })
            }
            return (
                <Paper className='assignment-info'>
                    <b className='assignment-info__title'>
                        Anda telah mengumpulkan tugas ini
                    </b>
                    {renderSubmitted}
                </Paper>
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
