import React from 'react'
import { Link } from 'react-router'

const AssignmentItem = (props, context) => {
    const { assignment } = props;
    const { groupId } = context;

    const dueDate = new Date(assignment.due_date)
    // TODO: display time format
    // TODO: display time left
    const date = `${dueDate.getDate()} ${dueDate.getMonth()} ${dueDate.getFullYear()} ${dueDate.getHours()}:${dueDate.getMinutes()}`
    var style;
    if (assignment.is_passed) {
        style = { backgroundColor: '#eee' }
    }
    return (
        <div style={style}>
            <Link to={`/groups/${groupId}/assignments/${assignment.id}`}>
            <p>
                <span>{assignment.title}</span>
                <span> {date}</span>
            </p>
            </Link>
        </div>
    )
}

AssignmentItem.contextTypes = {
    groupId: React.PropTypes.string
}

export default AssignmentItem
