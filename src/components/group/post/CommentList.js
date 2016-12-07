import React from 'react'
import CommentItem from './CommentItem'

const CommentList = (props) => {
    const renderComment = props.comments.map(comment => {
        return (
            <CommentItem key={comment.id} comment={comment} />
        )
    })

    return (
        <div className='post-item__comments'>{renderComment}</div>
    )
}

export default CommentList
