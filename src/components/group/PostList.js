import React from 'react'
import PostItem from './PostItem'

class PostList extends React.Component {
    render () {
        var renderPost = this.props.posts.map(post => {
            return (
                <div key={post.id}>
                    <PostItem post={post} />
                </div>
            )
        })

        return (
            <div>{renderPost}</div>
        )
    }
}

export default PostList
