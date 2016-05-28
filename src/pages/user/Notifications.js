import React from 'react'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Paper from 'material-ui/lib/paper'
import Avatar from 'material-ui/lib/avatar'
import RaisedButton from 'material-ui/lib/raised-button'
import FontIcon from 'material-ui/lib/font-icon'

import {materialLetter} from '../../config'
import {customMoment} from '../../config/customMoment'
import UserService from '../../api/user'
import { connect } from 'react-redux'
import { fetchNotification, cleanNotification, markReadNotification } from '../../actions/notification'

class Notifications extends React.Component {
    componentDidMount() {
        this.props.fetchNotification()
        this.context.setPageTitle('Notifikasi')
    }
    handleClick(notif) {
        switch(notif.action_type) {
            case null:
            case 'post':
                this.context.router.push(`/groups/${notif.target.id}`)
                break
            case 'assignment':
                this.context.router.push(`/groups/${notif.target.id}/assignments/${notif.action_object.id}`)
                break
            case 'lesson':
                this.context.router.push(`/groups/${notif.target.id}/lessons`)
                break
            default:
                console.log('item notif')
        }
    }
    clean() {
        this.props.cleanNotification()
        this.context.unMarkNotifBadge()
        UserService.cleanNotification()
    }
    markRead() {
        this.props.markReadNotification()
        this.context.unMarkNotifBadge()
        UserService.markReadNotification()
    }
    getRightIcon(type) {
        var icon
        switch(type) {
            case null:
            case 'post':
                icon = 'forum'
                break
            case 'assignment':
                icon = 'assignment'
                break
            case 'lesson':
                icon = 'import_contacts'
                break
            default:
                icon = 'public'
                break
        }
        return <FontIcon className='material-icons'>{icon}</FontIcon>
    }
    render() {
        const notification = this.props.notification
        var renderItems
        if (notification.isLoading && !notification.items.length) {
            renderItems = 'Loading'
        } else if (!notification.isLoading && notification.items.length) {
            const items = notification.items.map(notif => {
                const text = `${notif.actor.name} ${notif.verb} di grup ${notif.target.title}`

                const src = (notif.actor.photo.hasOwnProperty('thumbnail')) ?
                    notif.actor.photo.thumbnail : materialLetter(notif.actor.name.charAt(0).toUpperCase())

                const rightIcon = this.getRightIcon(notif.action_type)
                const bg = (notif.unread) ? '#2196F3': 'rgba(255,255,255,0)'
                
                return (
                <ListItem
                    style={{borderLeft: `3px solid ${bg}`}}
                    key={notif.id}
                    leftAvatar={<Avatar size={48} src={src} backgroundColor='#fff' />}
                    rightIcon={rightIcon}
                    primaryText={text}
                    secondaryText={customMoment(notif.timestamp).fromNow()}
                    onTouchTap={() => {
                        this.handleClick(notif)
                    }} />
                )
            })
            renderItems = (
                <div>
                    <RaisedButton
                        label='Bersihkan'
                        onTouchTap={this.clean.bind(this)} />
                    <RaisedButton primary={true}
                        style={{ float:'right' }}
                        label='Tandai sudah dibaca'
                        onTouchTap={this.markRead.bind(this)} />
                    <List style={{marginTop: 10}}>{items}</List>
                </div>
            )
        } else if (notification.isError) {
            renderItems = 'notif error'
        } else if (!notification.length) {
            renderItems = 'Tidak ada notifikasi'
        }
        return (
            <Paper className='paper' style={{padding: 30}}>
                <div className='col-md-10 col-md-offset-1'>
                    {renderItems}
                </div>
                <div style={{clear:'both'}}></div>
            </Paper>
        )
    }
}

Notifications.contextTypes = {
    router: React.PropTypes.object,
    setPageTitle: React.PropTypes.func,
    markNotifBadge: React.PropTypes.func,
    unMarkNotifBadge: React.PropTypes.func
}

const stateToProps = state => ({
    notification: state.notification
})

const dispatchToProps = dispatch => ({
    fetchNotification: () => {
        dispatch(fetchNotification())
    },
    markReadNotification: () => {
        dispatch(markReadNotification())
    },
    cleanNotification: () => {
        dispatch(cleanNotification())
    }
})

export default connect(stateToProps, dispatchToProps)(Notifications)
