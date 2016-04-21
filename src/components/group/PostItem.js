import React from 'react'
import { connect } from 'react-redux'
import { fetchComment } from '../../actions/post'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: '',
            showComment: false
        }
    }
    
    handleChange(e) {
        this.setState({ commentText: e.target.value })
    }

    render() {
        const post = this.props.post;
        if (this.state.showComment) {
            var renderCommentText = (
                <TextField
                    value={this.state.commentText}
                    id={post.id.toString()}
                    multilie={true}
                    onChange={this.handleChange.bind(this)}
                    autoFocus={true}
                    />
            )
        } else {
            var renderCommentText = ''
        }
        return (
            <div>
                <div>
                    <b>{post.user.name}</b>
                    <span>:{post.text}</span>
                    {/*<div><CommentList comments={comments} /></div>*/}
                    {this.state.commentText}
                </div>
                <div>{renderCommentText}</div>
                <FlatButton label="comment" secondary={true}
                    onClick={() => {
                        this.setState({ showComment: !this.state.showComment });
                        this.props.fetchComment(this.context.groupId, this.props.post.id);
                    }} />
            </div>
        )
    }
}

PostItem.contextTypes = {
    groupId: React.PropTypes.string
}

const stateProps = state => ({
    comments: state.comments
})

const dispatchProps = dispatch => ({
    fetchComment: (groupId, postId) => {
        dispatch(fetchComment(groupId, postId))
    }
})

export default connect(stateProps, dispatchProps)(PostItem)
