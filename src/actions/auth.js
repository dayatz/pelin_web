import { createAsyncAction } from '../config/createAsyncAction'
export var loginAction = createAsyncAction('LOGIN');

import AuthService from '../api/auth'

export function login(email, password, router) {
    return dispatch => {
        dispatch({
            type: loginAction.start
        });

        return AuthService.login(email, password)
            .then((r) => {
                console.log(r);
                AuthService.setToken(r.data.token);
                dispatch({
                    type: loginAction.success,
                    bearer: r.data.token
                });
                router.replace('/');
            })
            .catch((err) => {
                console.log(err.data);
                dispatch({
                    type: loginAction.fail,
                    error: 'username atau password salah'
                })
            })

    }
}

export function logout(router) {
    console.log(router);
    router.replace('/login');
    AuthService.logout();
    return {
        type: 'USER_LOGOUT'
    }
}
