import React from 'react'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import customTheme from '../config/theme'
import AppBar from 'material-ui/lib/app-bar'

// TODO: design base view in this component
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
                    title="Title"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <div>{this.props.children}</div>
            </div>
        )
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default App
