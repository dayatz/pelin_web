import React from 'react'
import { connect } from 'react-redux'
import { assignmentAddAction } from '../../actions/assignment'
import AssignmentService from '../../api/assignment'

class AssignmentDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            assignmentId: this.props.params.assignmentId,
            // assignment: (() => {
            //     return this.props.assignments.items[this.props.params.groupId]
            //         .filter(a => {
            //             return a.id == this.props.params.assignmentId
            //         })
            // })()[0],
            assignment: null,
            loading: false
        }
    }
    getChildContext() {
        return {
            assignmentId: this.state.assignmentId,
            // assignment: this.getAssignment()
        }
    }
    /* TODO

        <AssignmentInfo assignment=assignment />
        <AssignmentDetailTeacher />
            <SubmittedAssignmentList />
                <SubmittedAssignmentItem submittedAssignment={submittedAssignment} />
        ---- or -------
        <AssignmentDetailStudent />
            <SubmitAssignmentForm />

    */
    componentDidMount() {
        this.getAssignment()
    }
    getAssignment() {
        var assignment;
        try {
            assignment = this.props.assignments.items[this.context.groupId]
                .filter(a => {
                    return a.id == this.state.assignmentId
                })[0]
            this.setState({ assignment })
        } catch(e) {
            console.log(e)
        }

        if (!assignment) {
            const groupId = this.context.groupId;
            this.setState({ loading: true })

            AssignmentService(groupId)
                .fetch(this.state.assignmentId)
                .then(r => {
                    console.log(r.data)
                    // this.props.assignmentAdd(groupId, r.data)
                    this.setState({ loading: false, assignment: r.data })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    render () {
        var renderAssignment;
        if (this.state.loading && this.state.assignment) {
            renderAssignment = <span>Loading...</span>
        } else if (!this.state.loading && this.state.assignment) {
            // AssignmentInfo
            renderAssignment = (
                <span>{this.state.assignment.title}</span>
            )
        } else {
            renderAssignment = <span>Not found </span>
        }

        return (
        <div>
            {renderAssignment}
            {/*<AssignmentInfo assignment={this.getAssignment()} />*/}
        </div>
        )
    }
}

AssignmentDetail.contextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object
}

AssignmentDetail.childContextTypes = {
    assignmentId: React.PropTypes.string
}

const stateToProps = state => ({
    assignments: state.assignments
})

const dispatchToProps = dispatch => ({
    assignmentAdd: (groupId, item) => {
        dispatch(assignmentAddAction(groupId, item))
    }
})

export default connect(stateToProps, dispatchToProps)(AssignmentDetail)
