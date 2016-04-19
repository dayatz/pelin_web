import { loginAction } from '../actions/auth'
import store from 'store'

const initialState = {
    isLoading: false,
    bearer: store.get('bearer') || null,
    isError: false,
    error: null,
    user: store.get('user') || null
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGOUT':
            return initialState
        case loginAction.start:
            return Object.assign({}, state, {
                isLoading: true,
                error: null
            })
        case loginAction.success:
            return Object.assign({}, initialState, {
                bearer: action.bearer,
                user: action.user
            })
        case loginAction.fail:
            return Object.assign({}, state, {
                isLoading: false,
                isError: true,
                error: action.error
            })
        default:
            return state
    }
}

export default auth
