import React from 'react'
import Link from 'react-router/lib/Link'

const ConversationItem = (props) => {
    const { conversation } = props
    return (
        <div>
            <Link to={`/messages/${conversation.user_id}`}>
            {conversation.target_user.name}
            </Link>
            <button onClick={() => {
                props.removeConversation(conversation.user_id)
            }}>x</button>
        </div>
    )
}

export default ConversationItem

