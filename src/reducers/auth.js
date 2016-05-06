import { loginAction } from '../actions/auth'
import store from 'store'

const auth = (state = {
    isLoading: false,
    bearer: store.get('bearer') || null,
    isError: false,
    error: null,
    user: store.get('user') || null
}, action) => {
    switch (action.type) {
        // case 'USER_LOGOUT':
        //     return initialState
        case loginAction.start:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case loginAction.success:
            return {
                ...state,
                bearer: action.bearer,
                user: action.user
            }
        case loginAction.fail:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        case 'USER_UPDATE_PROFILE':
            return { ...state, user: action.user }
        default:
            return state
    }
}

export default auth
