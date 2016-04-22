import React from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

class NewPostForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    onChange(e) {
        this.setState({ value: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        const comment = this.state.value
        console.log(`submit on group ${this.context.groupId}`, comment);
    }
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <TextField
                    onChange={this.onChange.bind(this)}
                    autoComplete='off' id='new-post' />
                <RaisedButton type='submit' label='Send' primary={true} />
            </form>
        )
    }
}

NewPostForm.contextTypes = {
    groupId: React.PropTypes.string
}

export default NewPostForm
