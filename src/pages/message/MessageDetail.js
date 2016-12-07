import React from 'react'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import { connect } from 'react-redux'
import { fetchMessage } from '../../actions/message'
import MessageList from '../../components/message/MessageList'
import MessageForm from '../../components/message/MessageForm'
import Loading from '../../components/Loading'

class MessageDetail extends React.Component {
    getChildContext() {
        return {
            userId: this.props.params.messageId
        }
    }
    componentDidMount() {
        this.props.fetchMessage(this.props.params.messageId)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.params.messageId != this.props.params.messageId) {
            this.props.fetchMessage(nextProps.params.messageId)
        }
    }
    render() {
        const messages = this.props.messages.items[this.props.params.messageId]

        var renderMessageDetail
        if (messages && messages.length) {
            renderMessageDetail = (
                <div>
                    <div style={{float:'right'}}>
                    <IconMenu
                        iconStyle={{fontSize: 32, color: '#616161'}}
                        iconButtonElement={
                            <IconButton>
                                <FontIcon className='material-icons'>more_vert</FontIcon>
                            </IconButton>
                        }
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }} >
                        <MenuItem
                            primaryText='Hapus Percakapan'
                            leftIcon={
                                <FontIcon
                                    className='material-icons'>delete</FontIcon>
                                }
                                onTouchTap={() => {
                                    if (confirm('Hapus percakapan ini ?')) {
                                        this.context.removeConversation(this.props.params.messageId)
                                        this.context.router.replace('/messages')
                                    }
                                }} />
                    </IconMenu>
                    </div>
                    <div style={{clear:'both'}}></div>

                    <MessageList messages={messages} />
                    <MessageForm />
                </div>
            )
        } else if (messages && !messages.length) {
            renderMessageDetail = <span>No message</span>
        } else {
            renderMessageDetail = <Loading />
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
MessageDetail.contextTypes = {
    removeConversation: React.PropTypes.func,
    router: React.PropTypes.object
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
