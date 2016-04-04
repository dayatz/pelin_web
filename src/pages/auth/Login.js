import React from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import CircularProgress from 'material-ui/lib/circular-progress'
import FontIcon from 'material-ui/lib/font-icon'

import AuthService from '../../api/auth'
import {BASE_URL} from '../../config'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false
        }
    }

    handleClick() {
        this.setState({isFetching: true});

        console.log(this.props);

        const username = this.refs.username.getValue();
        const password = this.refs.password.getValue();

        AuthService.login(username, password)
        .then((r) => {
            console.log(r);
            console.log(BASE_URL);
            this.setState({isFetching: false});
        })
    }

    render() {
        let style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: -128,
            marginTop: -66,
        }

        if (!this.state.isFetching) {
            var loginBtn = (
                <RaisedButton style={{width: '100%'}} label="Login" primary={true} onClick={this.handleClick.bind(this)} />
            )
        } else {
            var loginBtn = (
                <RaisedButton style={{width: '100%'}} disabled={true}>
                    <CircularProgress size={0.4} style={{marginTop: -6}} />
                </RaisedButton>
            );
        }

        return (
            <div style={style}>
            <TextField ref="username" disabled={this.state.isFetching} hintText="NIM/Username/Email" autoFocus={true} />
            <br/>
            <TextField ref="password" disabled={this.state.isFetching} type="password" hintText="Password" />
            <br/>
            {loginBtn}
            </div>
        )
    }
}

Login.willTransitionTo = () => {
    console.log('asdf');
}

export default Login
