import React from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import Avatar from 'material-ui/lib/avatar'
import FontIcon from 'material-ui/lib/font-icon'
import { materialLetter } from '../../../config'

export default function SubmittedAssignmentItem(props) {
    var photo
    if (props.submit.user.photo.hasOwnProperty('small')) {
        photo = props.submit.user.photo.small
    } else {
        photo = materialLetter(props.submit.user.name.charAt(0))
    }
    return (
        <ListItem
            leftAvatar={<Avatar src={photo} />}
            primaryText={props.submit.user.name}
            secondaryText={props.submit.user.student.nim}
            rightIcon={<FontIcon className='material-icons'>file_download</FontIcon>}
            onTouchTap={() => {
                window.open(props.submit.file, '_blank')
            }} />
    )
}
