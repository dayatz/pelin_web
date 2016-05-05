import createAsyncAction from '../actions/createAsyncAction'
export var loginAction = createAsyncAction('LOGIN')

import AuthService from '../api/auth'
import UserService from '../api/user'

export function login(email, password, router) {
    return dispatch => {
        dispatch({
            type: loginAction.start
        })

        return AuthService.login(email, password)
            .then((r) => {
                const token = r.data.token
                AuthService.setToken(token)
                UserService.me()
                    .then((r) => {
                        const user = r.data
                        UserService.saveUser(user)
                        dispatch({
                            type: loginAction.success,
                            bearer: token,
                            user
                        })
                        router.replace('/')
                    })
                    .catch((err) => {
                        console.log(err.data)
                        dispatch({
                            type: loginAction.fail,
                            error: 'username atau password salah'
                        })
                    })
            })
            .catch((err) => {
                console.log(err.data)
                dispatch({
                    type: loginAction.fail,
                    error: 'username atau password salah'
                })
            })

    }
}

export function logout(router) {
    AuthService.logout()
    router.replace('/login')
    return {
        type: 'USER_LOGOUT'
    }
}

export function updateProfile(data) {
    return {
        type: 'USER_UPDATE_PROFILE',
        data
    }
}
