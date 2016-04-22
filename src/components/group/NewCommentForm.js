import React from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import PostService from '../../api/post'

class NewCommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: '',
            sending: false
        }
    }
    handleChange(e) {
        this.setState({ commentText: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({ sending: true })
        
        const postId = this.props.postId;
        const text = this.state.commentText;
        PostService(this.context.groupId)
            .comment(postId, { text })
            .then(r => {
                this.context.store.dispatch({
                    type: 'ADD_COMMENT',
                    item: r.data,
                    postId
                })
            })
            .catch( error => {
                console.log(error)
            })

        console.log(this.state.commentText);
        this.clean();
    }
    clean() {
        this.setState({ commentText: '', sending: false });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <TextField
                    value={this.state.commentText}
                    id={this.props.postId.toString()}
                    onChange={this.handleChange.bind(this)}
                    autoComplete='off'
                    autoFocus={true} disabled={this.state.sending}
                    />
                <RaisedButton disabled={this.state.sending}
                    type='submit' label='comment' />
            </form>
        );
    }
}

NewCommentForm.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object
}

export default NewCommentForm;
