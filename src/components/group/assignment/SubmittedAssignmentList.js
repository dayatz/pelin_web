import React from 'react'
import SubmittedAssignmentItem from './SubmittedAssignmentItem'

const SubmittedAssignmentList = (props) => {
    const submitItem = props.submits.map(submit => {
        return <SubmittedAssignmentItem submit={submit} key={submit.id} />
    })
    return (
        <div>{submitItem}</div>
    )
}

export default SubmittedAssignmentList
