import React from 'react'
import Paper from 'material-ui/lib/paper'
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

    var renderItemList = props.lesson.files.map(file => {
        return <FlatButton target='_blank' linkButton={true} label={file.name} href={file.file} />
    });
    return (
        <div style={{width: 300, borderRadius: 10,
                    border: '1px solid #eee',
                    marginBottom: 10, padding: 10,
                    float: 'left', marginLeft: 10}}>
            {props.lesson.title}
            <div>
                {renderItemList}
            </div>
            {renderDeleteButton}
        </div>
    )
}

LessonItem.contextTypes = {
    group: React.PropTypes.object
}

export default LessonItem
