import React from 'react'
import { Link } from 'react-router'
import FontIcon from 'material-ui/lib/font-icon'
import Paper from 'material-ui/lib/paper'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Time from '../../Time'
import {splitText} from '../../../config'

const AssignmentItem = function(props, context) {

    const dueDate = new Date(props.assignment.due_date)
    const date = `${dueDate.getDate()}/${dueDate.getMonth()}/${dueDate.getFullYear()} ${dueDate.getHours()}:${dueDate.getMinutes()}`

    var left, leftBg, actionBtn, bgColor
    if (context.group.is_owner) {
        leftBg = '#2196F3'
        left =
            <span style={{fontSize: 18, color: '#fff'}}>
                {props.assignment.submitted_student}
            </span>
        actionBtn =
            <IconMenu
                style={{float: 'right'}}
                iconButtonElement={
                    <IconButton>
                        <FontIcon color='#757575' className='material-icons'>more_vert</FontIcon>
                    </IconButton>
                }
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                <MenuItem
                    onTouchTap={() => {
                        props.assignmentDetail(props.assignment.id)
                    }}
                    primaryText='Lihat'
                    leftIcon={<FontIcon className='material-icons'>view_list</FontIcon>} />
                <MenuItem
                    onTouchTap={() => {
                        props.editAssignment(props.assignment.id)
                    }}
                    primaryText='Edit'
                    leftIcon={<FontIcon className='material-icons'>edit</FontIcon>} />
                <MenuItem
                    onTouchTap={() => {
                        if (confirm('Hapus tugas ?')) {
                            props.deleteItem(props.assignment.id)
                        }
                    }}
                    primaryText='Hapus'
                    leftIcon={<FontIcon className='material-icons'>delete</FontIcon>} />
            </IconMenu>

        bgColor = '#fff'
    } else {
        if (!props.assignment.is_passed) {
            actionBtn =
                <IconButton
                    onTouchTap={() => {
                        props.assignmentDetail(props.assignment.id)
                    }}>
                    <FontIcon color='#757575' className='material-icons'>chevron_right</FontIcon>
                </IconButton>
        }

        if (props.assignment.is_submitted) {
            leftBg = '#009688'
            left = <FontIcon style={{ fontSize: 36 }} color='#fff' className='material-icons'>mood</FontIcon>

            if (props.assignment.is_passed) {
                bgColor = '#E0E0E0'
            }
        } else {
            if (props.assignment.is_passed) {
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
    }

    return (
        <div className='col-md-6'>
            <Paper style={{backgroundColor: bgColor}} className='assignment-item'>
                <div className='left' style={{backgroundColor: leftBg}}>{left}</div>
                <div className='assignment-item__title'>
                    <p>{splitText(30, props.assignment.title)}</p>
                    <Time isoDate={props.assignment.due_date} />
                </div>
                <div className='assignment-item__action'>
                    {actionBtn}
                    <div style={{clear: 'both'}}></div>
                </div>
            </Paper>
        </div>
    )
}

AssignmentItem.contextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object
}

export default AssignmentItem
