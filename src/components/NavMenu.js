import React from 'react'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import { Link } from 'react-router'

const NavMenu = (props) => {
    var renderCariGroup;
    if (!props.user.is_teacher) {
        renderCariGroup = (
            <MenuItem onTouchTap={() => {
                props.router.push('/groups');
            }}>
                Cari Grup
            </MenuItem>
        )
    }
    return (
        <LeftNav
            docked={false}
            width={250}
            open={props.open}
            onRequestChange={leftNavOpen => props.handleOpen(leftNavOpen)}>

            <MenuItem onTouchTap={() => {
                    props.router.push('/');
                }}>
                Home
            </MenuItem>
            {renderCariGroup}
            <MenuItem onTouchTap={() => {
                if(confirm('Apakah anda ingin logout?')) {
                    props.logout(props.router)
                }
            }}>
                Logout
            </MenuItem>
        </LeftNav>
    )
}

export default NavMenu
