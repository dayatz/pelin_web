import React from 'react'
import Paper from 'material-ui/lib/paper'
import Avatar from 'material-ui/lib/avatar'
import FontIcon from 'material-ui/lib/font-icon'
import Time from '../../Time'
import {splitText} from '../../../config'


const AssignmentInfo = function(props) {
    var file
    if (props.assignment.file) {
        const filename = props.assignment.file.split('/')[props.assignment.file.split('/').length-1]
        file = <a className='post-item__attachment' href={props.assignment.file} target='_blank'>
            <Avatar size={24} style={{ marginRight: 5 }}>
                <FontIcon style={{ fontSize: 14, color: '#757575' }} className='material-icons'>attach_file</FontIcon>
            </Avatar>
            <span style={{ fontSize: 13 }}>{splitText(15, filename)}</span>
        </a>
    }
    var description
    if (props.assignment.description) {
        description = <p className='assignment-info__text'>{props.assignment.description}</p>
    }
    return (
        <div className={(props.isTeacher) ? 'col-md-6 col-md-offset-3':null}>
            <Paper style={{padding: 16}}>
                <p className='assignment-info__title'>{props.assignment.title}</p>
                <Time isoDate={props.assignment.due_date} />
                {description}
                {file}
            </Paper>
        </div>
    )
}

export default AssignmentInfo
