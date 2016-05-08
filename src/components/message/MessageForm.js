import React from 'react'
import ReactDOM from 'react-dom'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import MessageService from '../../api/message'
import { sendMsgAction} from '../../actions/message'

class MessageForm extends React.Component {
    onSubmit(e) {
        e.preventDefault()
        const text = this.refs.text.getValue()
        MessageService
            .send(this.context.userId, { text })
            .then(r => {
                const msg = {
                    me: true,
                    text: r.data.text,
                    sent: new Date().toISOString()
                }
                this.context.store.dispatch(
                    sendMsgAction(this.context.userId, msg))
                ReactDOM.findDOMNode(this.refs.form).reset()
            })
    }
    render() {
        return (
        <form onSubmit={this.onSubmit.bind(this)} ref='form'>
            <TextField autoFocus={true} id='new-message' ref='text' />
            <RaisedButton type='submit' label='Kirim' />
        </form>
        )
    }
}

MessageForm.contextTypes = {
    userId: React.PropTypes.string,
    store: React.PropTypes.object
}

export default MessageForm
