import React from 'react'
import Paper from 'material-ui/lib/paper'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import Time from '../../Time'
import {splitText} from '../../../config/'

const ExamItem = (props, context) => {
    const left = props.exam.score ? (props.exam.score * 100) : null
    const iconBtn = (
        <IconButton
            onTouchTap={() => {
                props.examDetail(props.exam.id)
            }}>
            <FontIcon color='#757575' className='material-icons'>chevron_right</FontIcon>
        </IconButton>
    )
    return (
        <div className='col-md-6'>
            <Paper className='assignment-item'>
                <div className='left' style={{backgroundColor: '#2196F3'}}>
                    <span style={{fontSize: 24, color: '#fff'}}>{left}</span>
                </div>
                <div className='assignment-item__title'>
                    <p>{splitText(30, props.exam.title)}</p>
                    <Time isoDate={props.exam.created_at} />
                </div>
                <div className='assignment-item__action'>
                    {iconBtn}
                    <div style={{clear: 'both'}}></div>
                </div>
            </Paper>
        </div>
    )
}

export default ExamItem
