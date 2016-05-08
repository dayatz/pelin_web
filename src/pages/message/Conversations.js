import React from 'react'
import { connect } from 'react-redux'
import { fetchConversation } from '../../actions/message'
import ConversationList from '../../components/message/ConversationList.js'


class Conversations extends React.Component {
    componentDidMount() {
        this.props.fetchConversation()
    }
    render() {
        /*
            - message list
                - if no list, render none, or create new conversation
                - if list, show conversation list
                    - render no message selected
                    - if selected, go to message detail
                        - render list message
                        - message form
                        - send message
        */
        const conversation = this.props.conversation
        var renderConversationList
        if (conversation.isLoading) {
            renderConversationList = 'Loading'
        } else {
            if ( conversation.items ) {
                renderConversationList = <ConversationList conversations={conversation.items} />
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
    }
})

export default connect(stateToProps, dispatchToProps)(Conversations)
