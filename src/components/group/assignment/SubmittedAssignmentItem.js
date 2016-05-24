import React from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import Avatar from 'material-ui/lib/avatar'
import FontIcon from 'material-ui/lib/font-icon'
import materialLetter from '../../../config/materialLetter'

const SubmittedAssignmentItem = (props) => {
    const { submit } = props
    console.log(submit)
    var photo
    if (submit.user.photo.hasOwnProperty('small')) {
        photo = submit.user.photo.small
    } else {
        photo = materialLetter(submit.user.name.charAt(0))
    }
    return (
        <ListItem
            leftAvatar={<Avatar src={photo} />}
            primaryText={submit.user.name}
            secondaryText={submit.user.student.nim}
            rightIcon={<FontIcon className='material-icons'>file_download</FontIcon>}
            onTouchTap={() => {
                window.open(submit.file, '_blank')
            }} />
    )
}

export default SubmittedAssignmentItem
