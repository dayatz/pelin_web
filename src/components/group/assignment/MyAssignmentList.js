import React from 'react'
import MyAssignmentItem from './MyAssignmentItem'

const MyAssignmentList = (props) => {
    const myAssignment = props.assignments.map(assignment => {
        return <MyAssignmentItem assignment={assignment} key={assignment.id} />
    })
    return (
        <div>
            {myAssignment}
        </div>
    )
}

export default MyAssignmentList
