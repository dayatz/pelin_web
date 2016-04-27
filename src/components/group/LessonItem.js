import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'

const LessonItem = (props, context) => {
    var renderDeleteButton;
    if (context.group.is_owner) {
        renderDeleteButton = (
        <FlatButton label='x' secondary={true}
                onClick={() => {
                    props.onDeleteClick(props.lesson);
                }} />
        )
    }
    return (
        <div>
        {props.lesson.title}
        {renderDeleteButton}
        </div>
    )
}

LessonItem.contextTypes = {
    group: React.PropTypes.object
}

export default LessonItem
