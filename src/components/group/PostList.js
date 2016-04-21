import React from 'react'
import PostItem from './PostItem'

const PostList = (props) => {
    var renderPost = props.posts.map(post => {
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

export default PostList
