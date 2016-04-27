import React from 'react'
import { fetchComment } from '../../actions/post'
import CommentList from '../../components/group/CommentList'
import NewCommentForm from '../../components/group/NewCommentForm'
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

    toggleComment() {
        this.setState({ showComment: !this.state.showComment });
        if (!this.state.showComment) {
            this.context.store.dispatch(
                fetchComment(this.context.groupId,
                this.props.post.id)
            )
        }
    }

    renderDeleteBtn() {
        if (this.props.post.me) {
            return <FlatButton label="Delete"
                onClick={() => {
                    this.props.handleDelete(this.props.post)
                }} />
        }
        return;
    }

    render() {
        const post = this.props.post;
        var renderComments = ''
        if (this.state.showComment) {
            // const comments = this.props.comments.items[post.id];
            const comments = this.props.comments;
            renderCommentList = <span>Loading...</span>;
            if (comments && comments.length) {
                var renderCommentList = (
                    <div><CommentList comments={comments} /></div>
                )
            } else if (comments && !comments.length) {
                renderCommentList = ''
            }

            var renderComments = (
                <div>
                {renderCommentList}
                <NewCommentForm postId={post.id} />
                </div>
            )
        }

        return (
            <div>
                <div>
                    <b>{post.user.name}</b>
                    <span>:{post.text}</span>
                </div>

                <div>{renderComments}</div>

                <FlatButton label="comment" secondary={true}
                    onClick={this.toggleComment.bind(this)} />

                {this.renderDeleteBtn()}
            </div>
        )
    }
}

PostItem.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object
}

export default PostItem
