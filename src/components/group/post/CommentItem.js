import React from 'react'
import Avatar from 'material-ui/lib/avatar'
import Text from '../../Text'

const CommentItem = (props) => {
    const { comment } = props

    if (comment.user.photo.hasOwnProperty('thumbnail')) {
        var avatar = <Avatar size={24} src={comment.user.photo.thumbnail} />
    } else {
        var avatar = <Avatar size={24}>{comment.user.name.charAt(0)}</Avatar>
    }
    return (
        <div className='comment-item'>
            <div className='comment-item__avatar'>{avatar}</div>
            <div className='comment-item__body'>
                <b className='comment-item__user'>{comment.user.name}</b>
                <p className='comment-item__text'><Text text={comment.text} /></p>
            </div>
        </div>
    )
}

export default CommentItem
