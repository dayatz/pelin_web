import React from 'react'
import Text from '../Text'

export default function MessageItem(props) {
    
    var className
    if (props.message.me) {
        className = 'me'
    } else {
        className = 'not-me'
    }
    return (
        <div>
            <div className={`chat-item__text ${className}`}>
                <Text text={props.message.text} />
            </div>
            <div style={{clear:'both'}}></div>
        </div>
    )
}