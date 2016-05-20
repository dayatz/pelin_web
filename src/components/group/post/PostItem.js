import React from 'react'

import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import Paper from 'material-ui/lib/paper'
import Avatar from 'material-ui/lib/avatar'
import Divider from 'material-ui/lib/divider'

import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'

import CommentList from './CommentList'
import NewCommentForm from './NewCommentForm'
import { fetchComment } from '../../../actions/post'

class PostItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commentText: '',
            votesCount: this.props.post.votes_count,
            isVoted: this.props.post.is_voted,
            showComment: false,
            zDepth: 1
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

        this.props.handleVote(this.props.post)
    }

    toggleComment() {
        this.setState({ showComment: !this.state.showComment })
        if (!this.state.showComment) {
            this.context.store.dispatch(
                fetchComment(this.context.groupId,
                this.props.post.id)
            )
        }
    }

    openComments() {
        this.setState({ showComment: true })
        this.context.store.dispatch(
            fetchComment(this.context.groupId,
            this.props.post.id)
        )
    }

    renderDeleteBtn() {
        if (this.props.post.me) {
            return (
                <IconMenu
                    iconButtonElement={
                        <IconButton>
                            <FontIcon className='material-icons'>more_vert</FontIcon>
                        </IconButton>
                    }
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >
                    <MenuItem
                        primaryText='Hapus'
                        leftIcon={
                            <FontIcon className='material-icons'>delete</FontIcon>
                        }
                        onClick={ () => {
                            this.props.handleDelete(this.props.post)
                        }} />
                </IconMenu>
            )
        }
        return
    }

    itemFocus() {
        this.setState({ zDepth: 3 })
    }
    itemUnfocus() {
        this.setState({ zDepth: 1 })
    }

    render() {
        const post = this.props.post
        var renderComments = ''
        if (this.state.showComment) {
            const comments = this.props.comments
            renderCommentList = <span>Loading...</span>

            if (comments && comments.length) {
                var renderCommentList = (
                    <CommentList comments={comments} />
                )
            } else if (comments && !comments.length) {
                renderCommentList = 'Belum ada komentar'
            }

            var renderComments = renderCommentList
            
        }

        // voted
        if (this.state.isVoted) {
            var iconVoted = <FontIcon color='white' className='material-icons'>favorite</FontIcon>
        } else {
            var iconVoted = <FontIcon className='material-icons'>favorite_border</FontIcon>
        }
        var votesCount
        if (this.state.votesCount) {
            votesCount = this.state.votesCount
        }

        // avatar
        if (post.user.photo && post.user.photo.thumbnail) {
            var avatar = <Avatar src={post.user.photo.thumbnail} />
        } else {
            let name = post.user.name
            var avatar = <Avatar>{name.charAt(0)}</Avatar>
        }

        // userStatus
        var userStatus
        if (post.user.teacher) {
            userStatus = <i style={{ color: '#9e9e9e' }}>Dosen</i>
        }

        return (
            <Paper className='post-item'
                zDepth={this.state.zDepth}
                onMouseEnter={() => { this.itemFocus() }}
                onMouseLeave={() => { this.itemUnfocus() }}>
                <div className='post-item__user-info'>
                    {avatar}
                    <b className='post-item__user-info__name'>
                        {post.user.name} {userStatus}
                    </b>
                    <div className='post-item__option'>{this.renderDeleteBtn()}</div>
                </div>

                <div className='post-item__text'>
                    <p>{post.text}</p>
                </div>

                <div className='post-item__action'>
                    <IconButton
                        onClick={this.handleVote.bind(this)}
                        style={{
                            background: (this.state.isVoted) ? '#2196F3': '#eee', borderRadius: '50%',
                            height: 32, width: 32, padding: 2,
                            boxShadow: (this.state.isVoted) ?
                                '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)' :
                                'none'
                        }}
                        iconStyle={{
                            fontSize: 16,
                            color: (this.state.isVoted) ? '#fff' : '#757575'
                        }}>
                        {iconVoted}
                    </IconButton> {votesCount}

                    <IconButton
                        onClick={this.toggleComment.bind(this)}
                        style={{
                            background: '#eee', borderRadius: '50%', float: 'right',
                            height: 32, width: 32, padding: 2
                        }}
                        iconStyle={{
                            fontSize: 16,
                            color: '#757575'
                        }}>
                        <FontIcon className='material-icons'>comment</FontIcon>
                    </IconButton>
                </div>

                {renderComments}

                <Divider />
                <div className='post-item__new-comment'>
                    <NewCommentForm
                        openComments={this.openComments.bind(this)}
                        postId={post.id} />
                </div>
            </Paper>
        )
    }
}

PostItem.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object,
    masonry: React.PropTypes.object
}

export default PostItem
