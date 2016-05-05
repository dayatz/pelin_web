import React from 'react'

const CommentItem = (props) => {
    console.log('[CommentItem] rendering')
    const { comment } = props

    return (
        <div style={{ marginLeft: 10 }}>
            <span><b>{comment.user.name}</b>{comment.text}</span>
        </div>
    )
}

export default CommentItem
