import React from 'react'
import TextField from 'material-ui/lib/text-field'


class NewConversationForm extends React.Component {
    submit(e) {       
        e.preventDefault()
        const userId = this.refs.userId.getValue()
        const text = this.refs.text.getValue()
        this.props.handleSubmit(userId, text)
        this.props.toggle()
    }
    render() {
    return (
        <form onSubmit={this.submit.bind(this)} ref='form'>
            <TextField
                fullWidth={true}
                autoFocus={this.props.openModal}
                id='userId'
                ref='userId'
                hintText='Masukkan NIM atau Username'
                autoComplete='off' />
            <br />
            <TextField
                fullWidth={true}
                id='text'
                ref='text'
                hintText='Pesan'
                multiLine={true}
                autoComplete='off'
                rows={2} />
        </form>
    )
    }
}

export default NewConversationForm
