import React from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import Avatar from 'material-ui/lib/avatar'

import Link from 'react-router/lib/Link'

import {materialLetter, splitText} from '../../config'

export default function ConversationItem(props) {
    var src, unread
    if (props.conversation.target_user.photo.hasOwnProperty('thumbnail')) {
        src = props.conversation.target_user.photo.thumbnail
    } else {
        src = materialLetter(props.conversation.target_user.name.charAt(0).toUpperCase())
    }
    if (props.conversation.unread) {
        unread = {backgroundColor: '#2196F3', color: '#FFFFFF'}
    }
    return (
        <ListItem
            style={unread}
            containerElement={<Link
                to={`/messages/${props.conversation.user_id}`}
                activeClassName='link-active' />}
            primaryText={splitText(30, props.conversation.target_user.name)}
            leftAvatar={<Avatar backgroundColor='#fff' src={src} />} />
    )
}

