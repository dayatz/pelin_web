import React from 'react'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import customTheme from '../config/theme'

import AppBar from 'material-ui/lib/app-bar'
import FontIcon from 'material-ui/lib/font-icon'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import FlatButton from 'material-ui/lib/flat-button'

class App extends React.Component {
    getChildContext() {
        return {
            muiTheme: getMuiTheme(customTheme)
        }
    }

    render() {
        return (
            <div>
                <AppBar
                    title={
                        <div className="col-md-8 col-md-offset-2">
                            <span>Pelin Web</span>

                            <div className="notification-wrapper">
                                <IconButton style={{paddingTop: 5}}>
                                    <FontIcon hoverColor="#fff" color="#bbb" className="material-icons">event_note</FontIcon>
                                </IconButton>
                                <IconButton style={{paddingTop: 5}}>
                                    <FontIcon hoverColor="#fff" color="#bbb" className="material-icons">chat_bubble</FontIcon>
                                </IconButton>
                                <IconButton style={{paddingTop: 5}}>
                                    <FontIcon hoverColor="#fff" color="#bbb" className="material-icons">public</FontIcon>
                                </IconButton>
                            </div>
                        </div>
                    }
                    iconElementRight={
                        <FlatButton label="username"
                            icon={<FontIcon className="material-icons">face</FontIcon>}
                        />
                    }
                    zDepth={2}
                />
                <div className="container" style={{marginTop: 20}}>
                    <div style={{paddingLeft: 160, paddingRight: 250}}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default App
