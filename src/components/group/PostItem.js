import React from 'react'

const PostItem = (props) => {
    const { post } = props;
    return (
        <p>
            <b>{post.user.name}</b>
            <span>:{post.text}</span>
        </p>
    )
}

export default PostItem
