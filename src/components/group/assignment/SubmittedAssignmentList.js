import React from 'react'
import List from 'material-ui/lib/lists/list'
import Paper from 'material-ui/lib/paper'
import SubmittedAssignmentItem from './SubmittedAssignmentItem'

const SubmittedAssignmentList = (props) => {
    const submitItem = props.submits.map(submit => {
        return <SubmittedAssignmentItem submit={submit} key={submit.id} />
    })
    return (
        <Paper>
            {submitItem}
        </Paper>
    )
}

export default SubmittedAssignmentList
