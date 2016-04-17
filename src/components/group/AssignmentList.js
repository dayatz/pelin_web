import React from 'react'
import Assignment from './Assignment'

const AssignmentList = (props) => {
    const renderAssignment = props.assignments.map(a => {
        return (
            <div key={a.id}>
                <Assignment assignment={a} />
            </div>
        )
    })

    return (
        <div>{renderAssignment}</div>
    )
}

export default AssignmentList
