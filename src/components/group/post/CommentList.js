import React from 'react'
import CommentItem from './CommentItem'

const CommentList = (props) => {
    const renderComment = props.comments.map(comment => {
        return (
            <div key={comment.id}>
                <CommentItem comment={comment} />
            </div>
        )
    })

    return (
        <div>{renderComment}</div>
    )
}

export default CommentList
