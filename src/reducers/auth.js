import {loginAction} from '../actions'

const initialState = {
    loading: false,
    bearer: localStorage.getItem('bearer') || null
}

const auth = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'USER_LOGOUT':
            // TODO: call logout function from api/auth.js
            return {}
        case loginAction.start:
            return Object.assign({}, state, {
                loading: true
            })
        case loginAction.success:
            return Object.assign({}, state, {
                bearer: action
            })
        default:
            return state
    }
}

export default auth
