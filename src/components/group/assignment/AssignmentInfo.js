import React from 'react'
import Paper from 'material-ui/lib/paper'
import Avatar from 'material-ui/lib/avatar'
import FontIcon from 'material-ui/lib/font-icon'
import Time from '../../Time'
import {splitText} from '../../../config'


const AssignmentInfo = (props) => {
    const { assignment, isTeacher } = props
    var file
    if (assignment.file) {
        const filename = assignment.file.split('/')[assignment.file.split('/').length-1]
        file = <a className='post-item__attachment' href={assignment.file} target='_blank'>
            <Avatar size={24} style={{ marginRight: 5 }}>
                <FontIcon style={{ fontSize: 14, color: '#757575' }} className='material-icons'>attach_file</FontIcon>
            </Avatar>
            <span style={{ fontSize: 13 }}>{splitText(15, filename)}</span>
        </a>
    }
    var description
    if (assignment.description) {
        description = <p className='assignment-info__text'>{assignment.description}</p>
    }

    var className
    if (isTeacher) {
        className = 'col-md-6 col-md-offset-3'
    }
    return (
        <div className={className}>
            <Paper style={{padding: 16}}>
                <p className='assignment-info__title'>{assignment.title}</p>
                <Time isoDate={assignment.due_date} />
                {description}
                {file}
            </Paper>
        </div>
    )
}

export default AssignmentInfo
