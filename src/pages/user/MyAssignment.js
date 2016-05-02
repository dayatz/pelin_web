import React from 'react'
import { connect } from 'react-redux'
import { fetchMyAssignment } from '../../actions/assignment'

class MyAssignment extends React.Component {
    componentDidMount() {
        this.props.fetchMyAssignment()
    }
    render() {
        const assignments = this.props.assignments
        return (
            <div>my assignments</div>
        )
    }
}

const stateToProps = state => ({
    assignments: state.myAssignments
})

const dispatchToProps = dispatch => ({
    fetchMyAssignment: () => {
        dispatch(fetchMyAssignment())
    }
})

export default connect(stateToProps, dispatchToProps)(MyAssignment)
