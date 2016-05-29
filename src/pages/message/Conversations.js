import React from 'react'
import { connect } from 'react-redux'
import FabAdd from '../../components/FabAdd'

import Dialog from 'material-ui/lib/dialog'
import Paper from 'material-ui/lib/paper'

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
    getChildContext() {
        return {
            removeConversation: this.removeConversation.bind(this)
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
        if (conversation.isLoading && !conversation.items) {
            renderConversationList = 'Loading'
        } else {
            if ( conversation.items ) {
                renderConversationList = 
                <div>
                    <div className='col-md-4 message-col'>
                        <ConversationList
                            newConversation={this._toggleModal.bind(this)}
                            conversations={conversation.items} />
                    </div>
                    <div className='col-md-8'>{this.props.children}</div>
                </div>
            } else {
                renderConversationList = 'Belum ada pesan'
            }
        }
        return (
            <Paper className='paper' style={{padding: '30px 15px'}}>
                <NewConversationModal
                    handleSubmit={this.newConversation.bind(this)}
                    toggle={this._toggleModal.bind(this)}
                    open={this.state.openModal} />
                {renderConversationList}
            </Paper>
        )
    }
}

Conversations.contextTypes = {
    router: React.PropTypes.object
}
Conversations.childContextTypes = {
    removeConversation: React.PropTypes.func
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
