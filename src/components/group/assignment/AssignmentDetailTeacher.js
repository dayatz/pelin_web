import React from 'react'
import { connect } from 'react-redux'
import { fetchSubmitted } from '../../../actions/assignment'
import AssignmentService from '../../../api/assignment'
import SubmittedAssignmentList from './SubmittedAssignmentList'


class AssignmentDetailTeacher extends React.Component {
    componentDidMount() {
        this.props.fetchSubmitted(
            this.context.groupId,
            this.context.assignmentId)
    }
    render() {
        const submits = this.props.submits.items[this.context.assignmentId]
        if (this.props.submits.isLoading) {
            var renderList = <span>Loading...</span>
        } else {
            if (submits && submits.length) {
                var renderList = (
                    <div>
                    <p>Mahasiswa yang mengumpulkan tugas</p>
                    <SubmittedAssignmentList submits={submits} />
                    </div>
                )
            } else {
                var renderList = <span>belum ada yang mengumpulkan</span>
            }
        }
        return (
            <div>
                {renderList}
            </div>
        )
    }
}

AssignmentDetailTeacher.contextTypes = {
    groupId: React.PropTypes.string,
    assignmentId: React.PropTypes.string
}

const stateToProps = state => ({
    submits: state.submits
})

const dispatchToProps = dispatch => ({
    fetchSubmitted: (groupId, assignmentId) => {
        dispatch(fetchSubmitted(groupId, assignmentId))
    }
})

export default connect(stateToProps, dispatchToProps)(AssignmentDetailTeacher)
