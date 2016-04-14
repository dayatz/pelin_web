import { loginAction } from '../actions/auth'
import store from 'store'

const initialState = {
    isLoading: false,
    bearer: null,
    isError: false,
    error: null,
    user: null
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGOUT':
            return initialState
        case loginAction.start:
            return Object.assign({}, state, {
                loading: true,
                error: ''
            })
        case loginAction.success:
            return Object.assign({}, state, {
                loading: false,
                bearer: action.bearer,
                error: ''
            })
        case loginAction.fail:
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            })
        default:
            return state
    }
}

export default auth
