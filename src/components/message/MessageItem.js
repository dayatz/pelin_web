import React from 'react'

const MessageItem = (props) => {
    const { message } = props
    
    var style
    if (!message.me) {
        style = {
            fontWeight: 'bold'
        }
    }
    return (
        <div>
            <p>
                <span style={style}>{message.text}</span>
            </p>
        </div>
    )
}

export default MessageItem
