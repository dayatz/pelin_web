import React from 'react'
import Paper from 'material-ui/lib/paper'
import { connect } from 'react-redux'
import { fetchMyAssignment } from '../../actions/assignment'
import MyAssignmentList from '../../components/group/assignment/MyAssignmentList'
import Loading from '../../components/Loading'

class MyAssignment extends React.Component {
    componentDidMount() {
        this.props.fetchMyAssignment()
        this.context.setPageTitle('Semua Tugas')
    }
    render() {
        const assignments = this.props.assignments

        var renderMyAssignmentList
        if (assignments.isLoading) {
            renderMyAssignmentList = <Loading />
        } else {
            if (assignments.items.length) {
                renderMyAssignmentList = <MyAssignmentList assignments={assignments.items} />
            } else {
                renderMyAssignmentList = 'Tidak ada tugas'
            }
        }
        return (
            <Paper className='paper' style={{padding: '30px 15px'}}>
                {renderMyAssignmentList}
            </Paper>
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

MyAssignment.contextTypes = {
    setPageTitle: React.PropTypes.func
}

export default connect(stateToProps, dispatchToProps)(MyAssignment)
