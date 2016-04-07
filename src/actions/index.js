import {USER_LOGIN_REQUEST} from './constans'
import {createAsyncAction} from '../config/createAsyncAction'

export var loginAction = createAsyncAction('LOGIN');

export function loginRequest() {
    return {
        type: USER_LOGIN_REQUEST
    }
}

export function doLogin(creds) {
    return dispatch => {
        return
    }
}
