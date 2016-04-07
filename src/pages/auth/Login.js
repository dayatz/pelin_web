import React from 'react'
import { connect } from 'react-redux'

import LoginForm from '../../components/auth/LoginForm'

import {loginRequest} from '../../actions/'

import AuthService from '../../api/auth'
import {BASE_URL} from '../../config'

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(u, p) {
        this.props.loginRequest();

        // TODO: call async login action

        // AuthService.login(username, password)
        // .then((r) => {
        //     this.setState({isFetching: false});
        //
        //     localStorage.setItem('dayat', 'wow');
        //     this.context.router.push('/');
        // })
    }

    render() {
        var bgImg = require('../../assets/img/loginbg.png');
        let loginPageStyle = {
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundPositionY: '55%',
            height: '100%',
            width: '100%',
            position: 'fixed'
        }

        return (
            <div style={loginPageStyle}>
                <LoginForm auth={this.props.auth} handleClick={this.handleClick.bind(this)} />
            </div>
        )
    }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return { auth: state.auth }
}

function mapDispatchToProps(dispatch) {
    return {
        loginRequest: () => { dispatch(loginRequest()) } // this should call action creator
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
