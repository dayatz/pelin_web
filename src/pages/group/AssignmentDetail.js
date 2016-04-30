import React from 'react'
import { connect } from 'react-redux'
import AssignmentService from '../../api/assignment'
import AssignmentInfo from '../../components/group/assignment/AssignmentInfo'
import AssignmentDetailStudent from '../../components/group/assignment/AssignmentDetailStudent'
import AssignmentDetailTeacher from '../../components/group/assignment/AssignmentDetailTeacher'


class AssignmentDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            assignmentId: this.props.params.assignmentId,
            assignment: null,
            loading: false
        }
    }
    getChildContext() {
        return {
            assignmentId: this.state.assignmentId,
            assignment: this.state.assignment
        }
    }
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
                    this.setState({ loading: false, assignment: r.data })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    render () {
        var renderAssignmentDetail;
        if (this.state.loading && this.state.assignment) {
            renderAssignmentDetail = <span>Loading...</span>
        } else if (!this.state.loading && this.state.assignment) {

            var renderAssignmentUser;
            if (this.context.group.is_owner) {
                renderAssignmentUser = <AssignmentDetailTeacher />
            } else {
                renderAssignmentUser = <AssignmentDetailStudent />
            }

            renderAssignmentDetail = (
                <div>
                    <AssignmentInfo assignment={this.state.assignment} />
                    {renderAssignmentUser}
                </div>
            )
        } else {
            renderAssignmentDetail = <span>Not found </span>
        }

        return (
            <div>
                {renderAssignmentDetail}
            </div>
        )
    }
}

AssignmentDetail.contextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object
}

AssignmentDetail.childContextTypes = {
    assignmentId: React.PropTypes.string,
    assignment: React.PropTypes.object
}

const stateToProps = state => ({
    assignments: state.assignments
})

export default connect(stateToProps, null)(AssignmentDetail)
