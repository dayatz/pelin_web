import React from 'react'

import { connect } from 'react-redux'
import Masonry from 'react-masonry-component'

import PostItem from './PostItem'
import PostService from '../../../api/post'

class PostList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            masonry: null
        }
    }
    getChildContext() {
        return {
            masonry: this.state.masonry
        }
    }
    handleDelete(post) {
        if (confirm('Hapus post ?')) {
            const postId = post.id
            const groupId = this.context.groupId
            this.props.deletePost(groupId, postId)

            PostService(groupId)
                .delete(postId)
                .then(r => {
                    console.log(r)
                })
        }
    }
    handleVote(post) {
        PostService(this.context.groupId)
            .vote(post.id)
            .then(r => {
                console.log(r)
            })
    }
    componentDidMount() {
        this.setState({ masonry: this.refs.masonry })
    }

    render () {
        var renderPost = this.props.posts.map(post => {
            return (
                <div key={post.id}>
                    <PostItem
                        post={post}
                        handleDelete={this.handleDelete.bind(this)}
                        handleVote={this.handleVote.bind(this)}
                        comments={this.props.comments.items[post.id]} />
                </div>
            )
        })

        return (
            <Masonry ref='masonry'>
                {renderPost}
            </Masonry>
        )
    }
}

PostList.contextTypes = {
    groupId: React.PropTypes.string
}
PostList.childContextTypes = {
    masonry: React.PropTypes.object
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
