import React from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import CircularProgress from 'material-ui/lib/circular-progress'
import Paper from 'material-ui/lib/paper'

class LoginForm extends React.Component {
    handleClick() {
        const username = this.refs.username.getValue();
        const password = this.refs.password.getValue();
        this.props.handleClick(username, password);
    }

    render() {
        let paperStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            padding: 20,
            height: 250,
            marginLeft: -148,
            marginTop: -125,
        }
        let btnStyle = {
            bottom: 0,
            width: '100%',
            position: 'absolute'
        }

        if (!this.props.auth.loading) {
            var loginBtn = (
                <RaisedButton style={btnStyle} label="Login"
                    primary={true} onClick={this.handleClick.bind(this)} />
            )
        } else {
            var loginBtn = (
                <RaisedButton style={btnStyle} disabled={true}>
                    <CircularProgress size={0.4} style={{marginTop: -6}} />
                </RaisedButton>
            );
        }

        return (
            <Paper style={paperStyle} zDepth={3}>
                <div style={{position: 'relative', height: '100%'}}>
                    <div>
                        <TextField
                            ref="username"
                            disabled={this.props.auth.loading}
                            hintText="NIM/Username/Email"
                            autoFocus={true} />
                    </div>

                    <div style={{marginTop: 20}}>
                        <TextField
                            ref="password"
                            disabled={this.props.auth.loading}
                            type="password" hintText="Password" />
                    </div>

                    {loginBtn}
                </div>
            </Paper>
        )
    }
}

export default LoginForm
