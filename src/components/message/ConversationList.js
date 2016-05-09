import React from 'react'
import ConversationItem from './ConversationItem.js'

const ConversationList = (props) => {
    const { conversations } = props

    var items = []
    for (var id in conversations) {
        items.push(
            <div key={id}>
                <ConversationItem
                    removeConversation={props.removeConversation}
                    conversation={conversations[id]} />
            </div>
        )
    }

    return <div>{items}</div>
}

export default ConversationList
