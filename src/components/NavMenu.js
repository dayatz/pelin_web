import React from 'react'
import LeftNav from 'material-ui/lib/left-nav'
import FontIcon from 'material-ui/lib/font-icon'
import Divider from 'material-ui/lib/divider'
import Avatar from 'material-ui/lib/avatar'
import MenuItem from 'material-ui/lib/menus/menu-item'
import { Link } from 'react-router'
import { materialLetter } from '../config'

const NavMenu = (props) => {
    var renderCariGroup
    var renderAssignments
    var renderVideos

    if (!props.user.is_teacher) {
        renderCariGroup = (
            <MenuItem onTouchTap={() => {
                props.closeNavMenu()
                props.router.push('/groups')
            }}
            primaryText='Cari Group'
            leftIcon={<FontIcon className="material-icons">search</FontIcon>} />
        )
        renderAssignments = (
            <MenuItem onTouchTap={() => {
                props.closeNavMenu()
                props.router.push('/assignments')
            }}
            leftIcon={<FontIcon className="material-icons">assignment</FontIcon>}
            primaryText='Tugas Saya' />
        )
    }

    if (props.user.is_teacher || props.user.is_admin || props.user.is_superuser) {
        renderVideos = (
            <MenuItem onTouchTap={() => {
                props.closeNavMenu()
                props.router.push('/videos')
            }}
            leftIcon={<FontIcon className="material-icons">video_library</FontIcon>}
            primaryText='Video' />
        )
    }

    if (props.user.photo.hasOwnProperty('medium')) {
        var avatar = <Avatar size={72} backgroundColor='#f5f5f5' src={props.user.photo.medium} />
    } else {
        const char = props.user.name.charAt(0).toUpperCase()
        var avatar = <Avatar size={72} src={materialLetter(char)} backgroundColor='#f5f5f5' />
    }

    if (props.user.is_teacher) {
        var nim = props.user.teacher.nik
    } else {
        var nim = props.user.student.nim
    }
    var bg = require('../assets/img/navmenu-bg.png')
    return (
        <LeftNav
            docked={false}
            width={250}
            open={props.open}
            onRequestChange={leftNavOpen => props.handleOpen(leftNavOpen)}>

            <div className='nav-menu__profile-container' style={{backgroundImage: `url(${bg})`}}>
                <div className='nav-menu__profile-user' onClick={() => {
                    props.closeNavMenu()
                    props.router.push('/profile')
                }}>
                    {avatar}
                    <p>{props.user.name}</p>
                    {nim}
                </div>
            </div>

            <Divider />
            <MenuItem onTouchTap={() => {
                    props.closeNavMenu()
                    props.router.push('/')
                }}
            primaryText='Home'
            leftIcon={<FontIcon className="material-icons">home</FontIcon>} />
            {renderCariGroup}
            {renderAssignments}
            {renderVideos}

            <div  style={{position: 'absolute', bottom: 0, width: '100%'}}>
                <Divider />
                <MenuItem onTouchTap={() => {
                    if(confirm('Apakah anda ingin logout?')) {
                        props.logout(props.router)
                    }
                }}
                leftIcon={<FontIcon className='material-icons'>exit_to_app</FontIcon>}
                primaryText='Logout' />
            </div>
        </LeftNav>
    )
}

export default NavMenu
