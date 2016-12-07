import React from 'react'
import Paper from 'material-ui/lib/paper'
import Avatar from 'material-ui/lib/avatar'
import RaisedButton from 'material-ui/lib/raised-button'
import FontIcon from 'material-ui/lib/font-icon'
import { materialLetter } from '../../../config'

export default function PendingItem(props) {

    return (
        <div className='col-md-3'>
        <Paper>
            <div className='pending-item__user'>
                <p className='name'>{props.pending.user.name}</p>
                <p className='nim'>{props.pending.user.student.nim}</p>
            </div>
            <div className='pending-item__action'>
                <RaisedButton
                    onTouchTap={() => {
                        props.approve(props.pending)
                    }}
                    style={{width: '50%'}}
                    primary={true}
                    icon={<FontIcon className='material-icons'>done</FontIcon>}
                    labelColor='#fff' />
                <RaisedButton
                    style={{width: '50%'}}
                    onTouchTap={() => {
                        props.decline(props.pending)
                    }}
                    icon={<FontIcon className='material-icons'>clear</FontIcon>} />
            </div>
            <div style={{clear:'both'}}></div>
        </Paper>
        </div>
    )
}