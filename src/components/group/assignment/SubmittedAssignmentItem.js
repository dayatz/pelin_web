import React from 'react'

const SubmittedAssignmentItem = (props) => {
    const { submit } = props
    return (
        <div>
            <span>{submit.user.name} ({submit.user.student.nim})</span>
            <a href={submit.file}>Download</a>
        </div>
    )
}

export default SubmittedAssignmentItem
