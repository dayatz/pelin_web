import React from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import CircularProgress from 'material-ui/lib/circular-progress'
import Paper from 'material-ui/lib/paper'

class LoginForm extends React.Component {
    onSubmit(e) {
        e.preventDefault()
        const username = this.refs.username.getValue()
        const password = this.refs.password.getValue()
        this.props.handleClick(username, password)
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

        if (!this.props.auth.isLoading) {
            var loginBtn = (
                <RaisedButton
                    type='submit'
                    label="Login"
                    primary={true} />
            )
        } else {
            var loginBtn = (
                <RaisedButton disabled={true}>
                    <CircularProgress size={0.4} style={{marginTop: -6}} />
                </RaisedButton>
            )
        }

        if (this.props.auth.isError) {
            var errorMsg = (
                <p style={{color: '#f44336', fontStyle: 'italic', fontSize: 14}}>{this.props.auth.error}</p>
            )
        } else {
            var errorMsg = ''
        }

        return (
            <Paper style={paperStyle} zDepth={3}>
                <div style={{position: 'relative', height: '100%'}}>
                    <form onSubmit={this.onSubmit.bind(this)}>
                    <div>
                        <TextField
                            ref="username"
                            disabled={this.props.auth.isLoading}
                            hintText="NIM/Username/Email"
                            autoFocus={true}
                            autoComplete='off' />
                    </div>

                    <div style={{marginTop: 20}}>
                        <TextField
                            ref="password"
                            disabled={this.props.auth.isLoading}
                            type="password" hintText="Password"
                            autoComplete='off' />
                    </div>
                    {errorMsg}
                    <div style={btnStyle}>
                        {loginBtn}
                        <a href="/forgot_password" style={{float: 'right', fontSize: 13, textDecoration: 'none'}}>Lupa password</a>
                        <div style={{marginTop: 10}}>
                            <a href="/register" style={{fontSize: 13, textDecoration: 'none', color: '#455A64'}}>Buat akun</a>
                        </div>
                    </div>
                    </form>
                </div>
            </Paper>
        )
    }
}

export default LoginForm
