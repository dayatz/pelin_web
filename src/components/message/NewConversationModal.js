import React from 'react'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'

import NewConversationForm from './NewConversationForm'

class NewConversationModal extends React.Component {
    render() {
        const actions = [
            <FlatButton label='Batal' onClick={this.props.toggle} />,
            <RaisedButton
                primary={true}
                label='Kirim'
                onClick={() => {
                    const form =  this.refs.conversationForm
                    const userId = form.refs.userId.getValue()
                    const text = form.refs.text.getValue()
                    this.props.handleSubmit(userId, text)
                }} />
        ]
        return (
            <Dialog
                {...this.props}
                open={this.props.open}
                actions={actions}>
                <NewConversationForm
                    ref='conversationForm'
                    openModal={this.props.open}
                    closeModal={this.props.toggle}
                    handleSubmit={this.props.handleSubmit} />
            </Dialog>
        )
    }
}

export default NewConversationModal
