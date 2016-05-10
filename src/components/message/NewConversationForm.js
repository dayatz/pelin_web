import React from 'react'
import TextField from 'material-ui/lib/text-field'


class NewConversationForm extends React.Component {
    submit(e) {       
        e.preventDefault()
        const userId = this.refs.userId.getValue()
        const text = this.refs.text.getValue()
        this.props.handleSubmit(userId, text)
    }
    render() {
    return (
        <form onSubmit={this.submit.bind(this)} ref='form'>
            <TextField
                autoFocus={this.props.openModal}
                id='userId'
                ref='userId'
                hintText='Masukkan NIM atau Username' />
            <br />
            <TextField
                id='text'
                ref='text'
                hintText='Pesan'
                multiLine={true}
                rows={2} />
        </form>
    )
    }
}

export default NewConversationForm
