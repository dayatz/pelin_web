import React from 'react'
import { connect } from 'react-redux'
import { fetchMessage } from '../../actions/message'
import MessageList from '../../components/message/MessageList'
import MessageForm from '../../components/message/MessageForm'

class MessageDetail extends React.Component {
    getChildContext() {
        return {
            userId: this.props.params.messageId
        }
    }
    componentDidMount() {
        this.props.fetchMessage(this.props.params.messageId)
    }
    render() {
        const messages = this.props.messages.items[this.props.params.messageId]

        var renderMessageDetail
        if (messages && messages.length) {
            renderMessageDetail = (
                <div>
                <MessageList messages={messages} />
                <MessageForm />
                </div>
            )
        } else if (messages && !messages.length) {
            renderMessageDetail = <span>No message</span>
        } else {
            renderMessageDetail = <span>Loading...</span>
        }

        return (
            <div>
                {renderMessageDetail}
            </div>
        )
    }
}

MessageDetail.childContextTypes = {
    userId: React.PropTypes.string
}

const stateToProps = state => ({
    messages: state.messages
})

const dispatchToProps = dispatch => ({
    fetchMessage: (conversationId) => {
        dispatch(fetchMessage(conversationId))
    }
})

export default connect(stateToProps, dispatchToProps)(MessageDetail)
