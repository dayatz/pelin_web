import React from 'react'
import { Link } from 'react-router'

import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import Paper from 'material-ui/lib/paper'

import {splitText} from '../../../config'
import Time from '../../Time'

const MyAssignmentItem = (props) => {
    const { assignment } = props

    const dueDate = new Date(assignment.due_date)
    
    var left, leftBg, actionBtn, bgColor
    if (!assignment.is_passed) {
        actionBtn =
            <IconButton
                onTouchTap={() => props.goTo(assignment.group.id, assignment.id)}>
                <FontIcon color='#757575' className='material-icons'>chevron_right</FontIcon>
            </IconButton>
    }
    if (assignment.is_submitted) {
        leftBg = '#009688'
        left = <FontIcon style={{ fontSize: 36 }} color='#fff' className='material-icons'>mood</FontIcon>

        if (assignment.is_passed) {
            bgColor = '#E0E0E0'
        }
    } else {
        if (assignment.is_passed) {
            bgColor = '#E0E0E0'
            leftBg = '#F44336'
            left =
                <FontIcon
                    title={date}
                    style={{ fontSize: 36 }}
                    color='#fff'
                    className='material-icons'>mood_bad</FontIcon>
        } else {
            leftBg = '#2196F3'
            left = 
                <span className='assignment-item__due'>
                    <p>{dueDate.getDate()}</p>
                    <p>{dueDate.getMonth()}/{dueDate.getFullYear()}</p>
                    <p>{dueDate.getHours()}:{dueDate.getMinutes()}</p>
                </span>
        }
    }

    return (
        <div className='col-md-6'>
            <Paper style={{backgroundColor: bgColor}} className='assignment-item'>
                <div className='left' style={{backgroundColor: leftBg}}>{left}</div>
                <div className='assignment-item__title'>
                    <p>{splitText(30, assignment.title)}</p>
                    <Time isoDate={assignment.due_date} />
                    <p>{assignment.group.title}</p>
                </div>
                <div className='assignment-item__action'>
                    {actionBtn}
                    <div style={{clear: 'both'}}></div>
                </div>
            </Paper>
        </div>
    )
}

export default MyAssignmentItem
