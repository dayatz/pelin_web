import React from 'react'
import { connect } from 'react-redux'
import { fetchMyAssignment } from '../../actions/assignment'
import MyAssignmentList from '../../components/group/assignment/MyAssignmentList'

class MyAssignment extends React.Component {
    componentDidMount() {
        this.props.fetchMyAssignment()
    }
    render() {
        const assignments = this.props.assignments

        var renderMyAssignmentList
        if (assignments.isLoading) {
            renderMyAssignmentList = 'Loading...'
        } else {
            if (assignments.items.length) {
                renderMyAssignmentList = <MyAssignmentList assignments={assignments.items} />
            } else {
                renderMyAssignmentList = 'Tidak ada tugas'
            }
        }
        return (
            <div>{renderMyAssignmentList}</div>
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
