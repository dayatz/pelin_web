import React from 'react'
import { connect } from 'react-redux'
import FabAdd from '../../components/FabAdd'
import Dialog from 'material-ui/lib/dialog'

import { fetchConversation, removeConversationAction } from '../../actions/message'
import ConversationList from '../../components/message/ConversationList'
import NewConversationModal from '../../components/message/NewConversationModal'
import MessageService from '../../api/message'


class Conversations extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false
        }
    }
    componentDidMount() {
        this.props.fetchConversation()
    }
    removeConversation(userId) {
        this.props.removeConversation(userId)
    }
    newConversation(userId, text) {
        MessageService.send(userId, {text})
            .then(r => {
                this._toggleModal()
                this.props.fetchConversation()
                this.context.router.push(`/messages/${userId}`)
            })
    }
    _toggleModal() {
        this.setState({ openModal: !this.state.openModal })
    }
    render() {
        const conversation = this.props.conversation
        var renderConversationList
        if (conversation.isLoading) {
            renderConversationList = 'Loading'
        } else {
            if ( conversation.items ) {
                renderConversationList = 
                <div>
                    <ConversationList
                        removeConversation={this.removeConversation.bind(this)}
                        conversations={conversation.items} />
                    <div>{this.props.children}</div>
                </div>
            } else {
                renderConversationList = 'Belum ada pesan'
            }
        }
        return (
            <div>
                <h3>Conversation List</h3>
                <FabAdd onClick={this._toggleModal.bind(this)} />
                <NewConversationModal
                    handleSubmit={this.newConversation.bind(this)}
                    toggle={this._toggleModal.bind(this)}
                    open={this.state.openModal} />
                {renderConversationList}
            </div>
        )
    }
}

Conversations.contextTypes = {
    router: React.PropTypes.object
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
