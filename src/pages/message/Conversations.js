import React from 'react'
import { connect } from 'react-redux'
import { fetchConversation, removeConversationAction } from '../../actions/message'
import ConversationList from '../../components/message/ConversationList.js'


class Conversations extends React.Component {
    componentDidMount() {
        this.props.fetchConversation()
    }
    removeConversation(userId) {
        this.props.removeConversation(userId)
    }
    render() {
        const conversation = this.props.conversation
        var renderConversationList
        if (conversation.isLoading) {
            renderConversationList = 'Loading'
        } else {
            if ( conversation.items ) {
                renderConversationList = 
                <ConversationList
                    removeConversation={this.removeConversation.bind(this)}
                    conversations={conversation.items} />
            } else {
                renderConversationList = 'Belum ada pesan'
            }
        }
        return (
            <div>
                <h3>Conversation List</h3>
                {renderConversationList}
                <div>{this.props.children}</div>
            </div>
        )
    }
}

const stateToProps = state => ({
    conversation: state.conversation
})
const dispatchToProps = dispatch => ({
    fetchConversation: () => {
        dispatch(fetchConversation())
    },
    removeConversation: (userId) => {
        dispatch(removeConversationAction(userId))
    }
})

export default connect(stateToProps, dispatchToProps)(Conversations)
