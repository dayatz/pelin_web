import React from 'react'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import Divider from 'material-ui/lib/divider'

class GroupActionTeacher extends React.Component {
    render() {
        return (
        <IconMenu
            iconButtonElement={
                <IconButton>
                    <FontIcon className='material-icons'>more_vert</FontIcon>
                </IconButton>
            }
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }} >
            <MenuItem
                primaryText='Edit'
                leftIcon={<FontIcon className='material-icons'>mode_edit</FontIcon>} />
            <Divider />
            <MenuItem
                style={{ color: 'red' }}
                primaryText='Hapus'
                leftIcon={<FontIcon style={{ color: 'red' }} className='material-icons'>delete</FontIcon>} />
        </IconMenu>
        )
    }
}

export default GroupActionTeacher
