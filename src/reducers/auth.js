import {loginAction} from '../actions/auth'

const initialState = {
    loading: false,
    bearer: localStorage.getItem('bearer') || null,
    error: ''
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGOUT':
            // TODO: call logout function from api/auth.js
            return {}
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
