import React from 'react'
import PostService from '../../api/post'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

class NewPostForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            sending: false
        }
    }
    onChange(e) {
        this.setState({ value: e.target.value })
    }
    clean() {
        this.setState({
            sending: false,
            value: ''
        });
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({ sending: true })

        const text = this.state.value.trim();
        if (text) {
            PostService(this.context.groupId)
            .create({ text })
            .then(r => {
                this.context.store.dispatch({
                    type: 'ADD_NEW_POST',
                    item: r.data,
                    groupId: this.context.groupId
                })
                this.clean();
            })
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <TextField
                    value={this.state.value}
                    disabled={this.state.sending}
                    multiLine={true}
                    rows={2}
                    onChange={this.onChange.bind(this)}
                    autoComplete='off' id='new-post' />

                <RaisedButton type='submit' label='Send'
                    primary={true} disabled={this.state.sending} />
            </form>
        )
    }
}

NewPostForm.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object
}

export default NewPostForm
