import React from 'react'
import Avatar from 'material-ui/lib/avatar'
import Text from '../../Text'
import {materialLetter} from '../../../config'

export default function CommentItem(props) {

    if (props.comment.user.photo.hasOwnProperty('thumbnail')) {
        var avatar = <Avatar size={24} backgroundColor={'#fff'} src={props.comment.user.photo.thumbnail} />
    } else {
        const char = props.comment.user.name.charAt(0).toUpperCase()
        var avatar = <Avatar size={24} src={materialLetter(char)} backgroundColor={'#fff'} />
    }
    return (
        <div className='comment-item'>
            <div className='comment-item__avatar'>{avatar}</div>
            <div className='comment-item__body'>
                <b className='comment-item__user'>{props.comment.user.name}</b>
                <p className='comment-item__text'><Text text={props.comment.text} /></p>
            </div>
        </div>
    )
}
