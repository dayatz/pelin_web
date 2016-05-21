import React from 'react'
import { logout } from '../actions/auth'
import { connect } from 'react-redux'

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import customTheme from '../config/theme'
import AppBar from 'material-ui/lib/app-bar'
import Snackbar from 'material-ui/lib/snackbar'
import FontIcon from 'material-ui/lib/font-icon'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import FlatButton from 'material-ui/lib/flat-button'

import NavMenu from '../components/NavMenu'
import Notification from '../components/Notification'


class App extends React.Component {
    getChildContext() {
        return {
            muiTheme: getMuiTheme(customTheme),
            auth: this.context.store.getState().auth,
            showSnackbar: this.showSnackbar.bind(this),
            setPageTitle: this.setPageTitle.bind(this)
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            navMenuOpen: false,
            snackbarOpen: false,
            snackbarMsg: '',
            pageTitle: ''
        }
    }

    showSnackbar(msg) {
        this.setState({ 
            snackbarOpen: true,
            snackbarMsg: msg
        })
    }

    setPageTitle(pageTitle) {
        this.setState({ pageTitle })
    }

    render() {
        return (
            <div>
                <Notification />
                <AppBar
                    title={
                        <div>
                            <span>{this.state.pageTitle}</span>

                            <div className="notification-wrapper">
                                <IconButton style={{paddingTop: 5}}>
                                    <FontIcon hoverColor="#fff" color="rgba(255, 255, 255, 0.701961)" className="material-icons">event_note</FontIcon>
                                </IconButton>
                                <IconButton style={{paddingTop: 5}}>
                                    <FontIcon hoverColor="#fff" color="rgba(255, 255, 255, 0.701961)" className="material-icons">chat_bubble</FontIcon>
                                </IconButton>
                                <IconButton style={{paddingTop: 5}}>
                                    <FontIcon hoverColor="#fff" color="rgba(255, 255, 255, 0.701961)" className="material-icons">public</FontIcon>
                                </IconButton>
                            </div>
                        </div>
                    }
                    iconElementRight={
                        <FlatButton
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
                    {...this.props}
                    user={this.context.store.getState().auth.user}
                    router={this.context.router}
                />

                {/* TODO: design container */}
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
    setPageTitle: React.PropTypes.func
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    logout: router => {
        // dispatch({ type: 'RESET'})
        dispatch(logout(router))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
