import React from 'react'
import { connect } from 'react-redux'
import AssignmentService from '../../api/assignment'
import Loading from '../../components/Loading'

class AssignmentDetailContainer extends React.Component {
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
        var assignment
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
            const groupId = this.context.groupId
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
        var renderAssignmentDetail
        if (this.state.loading && this.state.assignment) {
            renderAssignmentDetail = <Loading />
        } else if (!this.state.loading && this.state.assignment) {
            renderAssignmentDetail = this.props.children
        } else {
            renderAssignmentDetail = <span>Not found </span>
        }
        return <div>{renderAssignmentDetail}</div>
    }
}

AssignmentDetailContainer.contextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object
}

AssignmentDetailContainer.childContextTypes = {
    assignmentId: React.PropTypes.string,
    assignment: React.PropTypes.object
}

const stateToProps = state => ({
    assignments: state.assignments
})

export default connect(stateToProps, null)(AssignmentDetailContainer)
