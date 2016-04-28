import React, { PropTypes } from 'react'
import NewAssignmentForm from '../../components/group/NewAssignmentForm'

class AssignmentAdd extends React.Component {
    render () {
        return (
            <div>
                <h5>Tambah Tugas</h5>
                <NewAssignmentForm />
            </div>
        )
    }
}

export default AssignmentAdd;
