import React from 'react'
import { Link } from 'react-router'

const MyAssignmentItem = (props) => {
    const { assignment } = props
    return (
        <div style={{ padding: 5, border: '1px solid #eee' }}>
            <p>{assignment.title} - { assignment.due_date }</p>
            <p><i>{assignment.group.title}</i></p>
            <p><Link to={`/groups/${assignment.group.id}/assignments/${assignment.id}`}>detail</Link></p>
        </div>
    )
}

export default MyAssignmentItem
