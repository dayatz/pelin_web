import React from 'react'
import MessageItem from './MessageItem'

const MessageList = (props) => {
    const { messages } = props
    const renderMessage = messages.map(m => {
        return <MessageItem key={m.id} message={m} />
    })
    return (
        <div>{renderMessage}</div>
    )
}

export default MessageList
