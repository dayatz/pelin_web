import React from 'react'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import GroupService from '../../../api/group'
import { myGroupLeaveAction } from '../../../actions/group'

class GroupActionStudent extends React.Component {
    leave() {
        if (confirm('Apakah anda yakin ingin keluar dari grup ?')) {
            GroupService.leave(this.context.groupId)
                .then(r => {
                    this.context.store.dispatch(
                        myGroupLeaveAction(this.context.groupId))
                    this.context.router.replace('/')
                })
        }
    }

    render() {
        return (
        <IconMenu
            iconStyle={{fontSize: 32, color: '#fff'}}
            iconButtonElement={
                <IconButton>
                    <FontIcon className='material-icons'>more_vert</FontIcon>
                </IconButton>
            }
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }} >
            <MenuItem 
                primaryText='Info Grup'
                leftIcon={
                    <FontIcon className='material-icons'>info</FontIcon>
                }
                onClick={this.props.toggleModal} />
            <MenuItem
                primaryText='Keluar dari group'
                leftIcon={
                    <FontIcon
                        className='material-icons'>exit_to_app</FontIcon>
                    }
                onClick={this.leave.bind(this)} />
        </IconMenu>
        )
    }
}

GroupActionStudent.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object,
    router: React.PropTypes.object
}

export default GroupActionStudent
