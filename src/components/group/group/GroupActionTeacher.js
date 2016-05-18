import React from 'react'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import Divider from 'material-ui/lib/divider'
import GroupService from '../../../api/group'
import { myGroupLeaveAction, groupRemoveAction } from '../../../actions/group'

class GroupActionTeacher extends React.Component {
    delete() {
        if (confirm('Apakah anda yakin untuk menghapus grup ini ?')) {
            if (confirm('Grup akan terhapus secara permanen')) {
                GroupService
                .delete(this.context.groupId)
                .then(r => {
                    this.context.store.dispatch(
                        myGroupLeaveAction(this.context.groupId))
                    this.context.store.dispatch(
                        groupRemoveAction(this.context.groupId))
                    this.context.router.replace('/')
                })
            }
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
                primaryText='Edit'
                leftIcon={
                    <FontIcon className='material-icons'>mode_edit</FontIcon>
                }
                onClick={this.props.toggleModal} />
            <Divider />
            <MenuItem
                style={{ color: 'red' }}
                primaryText='Hapus'
                leftIcon={
                    <FontIcon style={{ color: 'red' }}
                        className='material-icons'>delete</FontIcon>
                    }
                onClick={this.delete.bind(this)} />
        </IconMenu>
        )
    }
}

GroupActionTeacher.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object,
    router: React.PropTypes.object
}

export default GroupActionTeacher
