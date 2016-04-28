import React from 'react'
import { fetchComment } from '../../actions/post'
import CommentList from '../../components/group/CommentList'
import NewCommentForm from '../../components/group/NewCommentForm'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'

class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: '',
            votesCount: this.props.post.votes_count,
            isVoted: this.props.post.is_voted,
            showComment: false
        }
    }

    handleChange(e) {
        this.setState({ commentText: e.target.value })
    }
    handleVote() {
        if (this.state.isVoted) {
            this.setState({
                votesCount: this.state.votesCount - 1,
                isVoted: !this.state.isVoted
            })
        } else {
            this.setState({
                votesCount: this.state.votesCount + 1,
                isVoted: !this.state.isVoted
            })
        }

        this.props.handleVote(this.props.post);
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

        if (this.state.isVoted) {
            var iconVoted = <FontIcon color='pink' className='material-icons'>favorite</FontIcon>
        } else {
            var iconVoted = <FontIcon color='pink' className='material-icons'>favorite_border</FontIcon>
        }

        return (
            <div>
                <div>
                    <b>({this.state.votesCount}) {post.user.name}</b>
                    <span> :{post.text}</span>
                </div>

                <div>{renderComments}</div>

                <IconButton onClick={this.handleVote.bind(this)}>
                    {iconVoted}
                </IconButton>

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
