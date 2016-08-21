import React from 'react'
import { logout } from '../actions/auth'
import { connect } from 'react-redux'

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import customTheme from '../config/theme'
import AppBar from 'material-ui/lib/app-bar'
import Snackbar from 'material-ui/lib/snackbar'
import Badge from 'material-ui/lib/badge'
import FontIcon from 'material-ui/lib/font-icon'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import FlatButton from 'material-ui/lib/flat-button'

import UserService from '../api/user'
import AuthService from '../api/auth.js'
import NavMenu from '../components/NavMenu'
import NotificationComponent from '../components/NotificationComponent'


class App extends React.Component {
    getChildContext() {
        return {
            muiTheme: getMuiTheme(customTheme),
            auth: this.context.store.getState().auth,
            showSnackbar: this.showSnackbar.bind(this),
            setPageTitle: this.setPageTitle.bind(this),
            markNotifBadge: this.markNotifBadge.bind(this),
            unMarkNotifBadge: this.unMarkNotifBadge.bind(this),
            toggleMsgBadge: this.toggleMsgBadge.bind(this),
            fetchAssignmentCount: this.fetchAssignmentCount.bind(this)
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            navMenuOpen: false,
            snackbarOpen: false,
            snackbarMsg: '',
            pageTitle: '',
            notifBadge: false || this.props.notification.items.length,
            assignmentCount: 0, msgCount: 0, notifCount: 0,
            msgBadge: false
        }
    }

    showSnackbar(msg) {
        this.setState({
            snackbarOpen: true,
            snackbarMsg: msg
        })
    }

    markNotifBadge() {
        this.setState({ notifBadge: true })
    }
    unMarkNotifBadge() {
        this.setState({ notifBadge: false })
    }
    toggleMsgBadge() {
        this.setState({ msgCount: 0 })
    }

    fetchAssignmentCount() {
        UserService.getAssignmentCount()
            .then(r => {
                this.setState({ assignmentCount: r.data.count })
            })
    }

    fetchMessageCount() {
        UserService.getMessageCount()
            .then(r => {
                this.setState({ msgCount: r.data.count })
            })
    }

    componentDidMount() {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
        UserService.getNotificationsCount()
            .then(r => {
                this.setState({ notifCount: r.data.count })
                if (r.data.count != 0) {
                    this.markNotifBadge()
                }
            })
        this.fetchAssignmentCount()
        this.fetchMessageCount()
    }

    componentWillMount() {
        const t = this
        if (AuthService.getToken()) {
            AuthService.verifyToken()
                .catch(function(err){
                    t.props.logout()
                })
        } else {
            t.props.logout()
        }
    }

    setPageTitle(pageTitle) {
        this.setState({ pageTitle })
    }

    closeNavMenu() {
        this.setState({ navMenuOpen: false })
    }

    renderAssignmentIcon() {
        if (!this.props.auth.user.is_teacher) {
            var assignmentBadge
            if (this.state.assignmentCount) {
                assignmentBadge = <span className='assignment-badge'>{this.state.assignmentCount}</span>
            }
            return (
                <IconButton style={{paddingTop: 5}} title='Tugas anda'
                    onClick={() => {
                        this.context.router.push('/assignments')
                    }}>
                    {assignmentBadge}
                    <FontIcon
                        hoverColor="#fff"
                        color="rgba(255, 255, 255, 0.701961)"
                        className="material-icons">event_note</FontIcon>
                </IconButton>
            )
        }
        return
    }

    render() {
        var notifBadge, msgBadge
        // if (this.state.notifBadge) {
        //     notifBadge = <div className='notif-unread'></div>
        // }
        if (this.state.notifCount) {
            notifBadge = <span className='assignment-badge'>{this.state.notifCount}</span>
        }
        if (this.state.msgCount) {
            msgBadge = <span className='assignment-badge'>{this.state.msgCount}</span>
        }
        return (
            <div>
                <NotificationComponent />
                <AppBar
                    title={
                        <div>
                            <span>{this.state.pageTitle}</span>

                            <div className="notification-wrapper">
                                {this.renderAssignmentIcon()}
                                <IconButton style={{paddingTop: 5}} title='Pesan'
                                    onClick={() => {
                                        this.context.router.push('/messages')
                                    }}>
                                    {msgBadge}
                                    <FontIcon
                                        hoverColor="#fff"
                                        color="rgba(255, 255, 255, 0.701961)"
                                        className="material-icons">chat_bubble</FontIcon>
                                </IconButton>
                                <IconButton style={{paddingTop: 5}} title='Notifikasi'
                                    onClick={() => {
                                        this.context.router.push('/notifications')
                                    }}>
                                    {notifBadge}
                                    <FontIcon
                                        hoverColor="#fff"
                                        color="rgba(255, 255, 255, 0.701961)"
                                        className="material-icons">public</FontIcon>
                                </IconButton>
                            </div>
                        </div>
                    }
                    iconElementRight={
                        <FlatButton title='Halaman profil anda'
                            onClick={() => { this.context.router.push('/profile') }}
                            label={this.props.auth.user.name.split(' ')[0]}
                            icon={<FontIcon className="material-icons">face</FontIcon>}
                        />
                    }
                    zDepth={0}
                    onLeftIconButtonTouchTap={() => {
                        this.setState({ navMenuOpen: !this.state.navMenuOpen })
                    }}
                />
                <div className='background-content'></div>

                <NavMenu open={this.state.navMenuOpen}
                    handleOpen={ navMenuOpen => {
                        this.setState({navMenuOpen})
                    }}
                    closeNavMenu={this.closeNavMenu.bind(this)}
                    {...this.props}
                    user={this.context.store.getState().auth.user}
                    router={this.context.router}
                />

                <div className="container" style={{marginTop: 20}}>
                    <div className="col-md-10 col-md-offset-1">
                        {this.props.children}
                    </div>
                </div>

                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMsg}
                    onRequestClose={() => {
                        this.setState({ snackbarOpen: false })
                    }}
                    autoHideDuration={3000}
                    />
            </div>
        )
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object,
    auth: React.PropTypes.object,
    showSnackbar: React.PropTypes.func,
    setPageTitle: React.PropTypes.func,
    markNotifBadge: React.PropTypes.func,
    unMarkNotifBadge: React.PropTypes.func,
    toggleMsgBadge: React.PropTypes.func,
    fetchAssignmentCount: React.PropTypes.func
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth,
    notification: state.notification
})

const mapDispatchToProps = dispatch => ({
    logout: router => {
        dispatch(logout(router))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
