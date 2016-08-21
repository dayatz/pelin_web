import React from 'react'
import ReactDOM from 'react-dom'
import shortid from 'shortid'

import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import MessageService from '../../api/message'
import { sendMsgAction} from '../../actions/message'

class MessageForm extends React.Component {
    onSubmit(e) {
        e.preventDefault()
        const text = this.refs.text.getValue()
        if (text) {
            const msg = {
                id: shortid.generate(),
                me: true,
                text: text,
                sent: new Date().toISOString()
            }
            this.context.store.dispatch(
                sendMsgAction(this.context.userId, msg))
            ReactDOM.findDOMNode(this.refs.form).reset()        

            MessageService
                .send(this.context.userId, { text })
                .then(r => {
                    console.log(r)
                })
        }
    }
    render() {
        return (
        <form onSubmit={this.onSubmit.bind(this)} ref='form'>
            <TextField
                style={{width: '80%'}}
                autoFocus={true}
                id='new-message' ref='text'
                autoComplete='off' />
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
