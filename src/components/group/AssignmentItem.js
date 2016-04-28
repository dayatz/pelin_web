import React from 'react'

const AssignmentItem = (props) => {
    const { assignment } = props;

    const dueDate = new Date(assignment.due_date)
    const date = `${dueDate.getDate()} ${dueDate.getMonth()} ${dueDate.getFullYear()} ${dueDate.getHours()}:${dueDate.getMinutes()}`
    var style;
    if (assignment.is_passed) {
        style = { backgroundColor: '#eee' }
    }
    return (
        <div style={style}>
            <p>
                <span>{assignment.title}</span>
                <span> {date}</span>
            </p>
        </div>
    )
}

export default AssignmentItem
