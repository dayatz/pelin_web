import React from 'react'
import { connect } from 'react-redux'
import LoginForm from '../../components/auth/LoginForm'
import {login} from '../../actions/auth'
import AuthService from '../../api/auth'

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(email, password) {
        this.props.loginRequest(email, password, this.context.router);
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
                <LoginForm auth={this.props.auth}
                    handleClick={this.handleClick.bind(this)} />
            </div>
        )
    }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    loginRequest: (email, password, router) => {
        dispatch(login(email, password, router));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
