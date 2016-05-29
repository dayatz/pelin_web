import React from 'react'

import { connect } from 'react-redux'
import { fetchPost } from '../../actions/post'

import PostList from '../../components/group/post/PostList'
import NewPostForm from '../../components/group/post/NewPostForm'
import Loading from '../../components/Loading'

class Posts extends React.Component {
    componentDidMount() {
        this.props.fetchPost(this.context.groupId)
    }

    render () {
        var posts = this.props.posts.items[this.context.groupId]
        if (posts && posts.length) {
            var renderPosts = <PostList posts={posts} />
        } else if (posts && !posts.length) {
            var renderPosts = <NewPostForm />
        } else {
            var renderPosts = <Loading />
        }
        return (
            <div>
                <div className='post-list'>{renderPosts}</div>
            </div>
        )
    }
}

Posts.contextTypes = {
    groupId: React.PropTypes.string
}

const mapStateToProps = state => ({
    posts: state.posts
})

const mapDispathToProps = dispatch => ({
    fetchPost: (groupId) => {
        dispatch(fetchPost(groupId))
    }
})

export default connect(mapStateToProps,
    mapDispathToProps)(Posts)
