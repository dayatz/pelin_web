import React from 'react'
import TextField from 'material-ui/lib/text-field'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'

import TextareaAutosize from 'react-autosize-textarea'

import PostService from '../../../api/post'

class NewCommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commentText: '',
            sending: false
        }
    }
    handleChange(e) {
        this.setState({ commentText: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        this.setState({ sending: true })

        const postId = this.props.postId
        const text = this.state.commentText.trim()

        if (text) {
            PostService(this.context.groupId)
                .comment(postId, { text })
                .then(r => {
                    this.context.store.dispatch({
                        type: 'ADD_COMMENT',
                        item: r.data,
                        postId
                    })
                    this.clean()
                })
                .catch( error => {
                    console.log(error)
                })
        }
    }
    clean() {
        this.setState({ commentText: '', sending: false })
    }
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)} style={{ width: '100%' }}>
                <TextareaAutosize
                    onResize={() => { this.context.masonry.masonry.layout() }}
                    value={this.state.commentText}
                    placeholder='Komentari post ini...'
                    id={this.props.postId.toString()}
                    onChange={this.handleChange.bind(this)}
                    disabled={this.state.sending}
                    autoComplete='off'
                    className='post-item__new-comment__text' />

                <IconButton
                    style={{ float: 'right' }}
                    disabled={this.state.sending}
                    type='button'>
                    <FontIcon className='material-icons'>send</FontIcon>
                </IconButton>
                <div style={{clear: 'both'}}></div>
            </form>
        )
    }
}

NewCommentForm.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object,
    masonry: React.PropTypes.object
}

export default NewCommentForm
