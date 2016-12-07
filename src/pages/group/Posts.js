import React from 'react'

import { connect } from 'react-redux'
import { fetchPost } from '../../actions/post'

import PostList from '../../components/group/post/PostList'
import NewPostForm from '../../components/group/post/NewPostForm'
import Loading from '../../components/Loading'
import Help from '../../components/Help'


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
                <Help text='Ini adalah halaman diskusi, silahkan posting diskusi di sini.' />
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
