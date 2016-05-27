import React from 'react'
import MyAssignmentItem from './MyAssignmentItem'

const MyAssignmentList = (props, context) => {
    const goTo = (groupId, assignmentId) => {
        context.router.push(`/groups/${groupId}/assignments/${assignmentId}`)
    }
    const myAssignment = props.assignments.map(assignment => {
        return (
            <MyAssignmentItem
                assignment={assignment}
                key={assignment.id}
                goTo={goTo} />
        )
    })
    return (
        <div>
            {myAssignment}
            <div style={{clear:'both'}}></div>
        </div>
    )
}

MyAssignmentList.contextTypes = {
    router: React.PropTypes.object
}

export default MyAssignmentList
