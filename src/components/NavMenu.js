import React from 'react'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import { Link } from 'react-router'

const NavMenu = (props) => {
    var renderCariGroup
    var renderAssignments
    if (!props.user.is_teacher) {
        renderCariGroup = (
            <MenuItem onTouchTap={() => {
                props.router.push('/groups')
            }}>
                Cari Grup
            </MenuItem>
        )
        renderAssignments = (
            <MenuItem onTouchTap={() => {
                props.router.push('/assignments')
            }}>
                Tugas Saya
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
                    props.router.push('/')
                }}>
                Home
            </MenuItem>
            {renderCariGroup}
            {renderAssignments}
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
