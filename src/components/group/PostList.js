import React from 'react'
import PostService from '../../api/post'
import { connect } from 'react-redux'
import PostItem from './PostItem'

class PostList extends React.Component {
    handleDelete(post) {
        const postId = post.id;
        const groupId = this.context.groupId;
        this.props.deletePost(groupId, postId)

        PostService(groupId)
            .delete(postId)
            .then(r => {
                console.log(r);
            })
    }
    render () {
        var renderPost = this.props.posts.map(post => {
            return (
                <div key={post.id}>
                    <PostItem
                        post={post}
                        handleDelete={this.handleDelete.bind(this)}
                        comments={this.props.comments.items[post.id]} />
                </div>
            )
        })

        return (
            <div>{renderPost}</div>
        )
    }
}

PostList.contextTypes = {
    groupId: React.PropTypes.string
}

const stateProps = state => ({
    comments: state.comments
})

const dispatchProps = dispatch => ({
    deletePost: (groupId, postId) => {
        dispatch({
            type: 'DELETE_POST',
            groupId,
            postId
        })
    }
})

export default connect(stateProps, dispatchProps)(PostList)
