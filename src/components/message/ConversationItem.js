import React from 'react'
import Link from 'react-router/lib/Link'

const ConversationItem = (props) => {
    const { conversation } = props
    return <Link to={`/messages/${conversation.user_id}`}>
        {conversation.target_user.name}
        </Link>
}

export default ConversationItem

