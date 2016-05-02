import React from 'react'
import { Link } from 'react-router'
import FlatButton from 'material-ui/lib/flat-button'

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
    if (assignment.is_submitted) {
        style = { backgroundColor: '#aaa' }
    }

    var renderDeleteBtn;
    if (context.group.is_owner) {
         renderDeleteBtn = <FlatButton label='x' onClick={() => {
            props.deleteItem(assignment.id)
        }} />
    }
    return (
        <div style={style}>
            <Link to={`/groups/${groupId}/assignments/${assignment.id}`}>{assignment.title}</Link>
            <span> {date}</span>
            {renderDeleteBtn}
        </div>
    )
}

AssignmentItem.contextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object
}

export default AssignmentItem
