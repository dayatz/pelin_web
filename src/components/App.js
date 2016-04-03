import React from 'react'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import customTheme from '../config/theme'
import RaisedButton from 'material-ui/lib/raised-button'

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
                <RaisedButton label="My Button" parimary={true} />
                <div>{this.props.children}</div>
            </div>
        )
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default App
