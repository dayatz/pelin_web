import React from 'react'
import MessageItem from './MessageItem'

export default class MessageList extends React.Component {
    scrollDiv() {
        const chatDiv = document.getElementsByClassName('message-detail__container')[0]
        chatDiv.scrollTop = chatDiv.scrollHeight
    }
    componentDidUpdate(prevProps, prevState) {
        this.scrollDiv()
    }
    componentDidMount() {
        this.scrollDiv()  
    }
    render() {
        var renderMessage = this.props.messages.map(function(m) {
            return <MessageItem key={m.id} message={m} />
        })
        return (
            <div className='message-detail__container'>
                {renderMessage}
            </div>
        )
    }
}