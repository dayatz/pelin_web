import React from 'react'

export default function MessageItem(props) {
    
    var style
    if (!props.message.me) {
        style = {
            fontWeight: 'bold'
        }
    }
    return (
        <div>
            <p>
                <span style={style}>{props.message.text}</span>
            </p>
        </div>
    )
}