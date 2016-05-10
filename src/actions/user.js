import createAsyncAction from './createAsyncAction.js'
import UserService from '../api/user'

export var fetchUserAction = createAsyncAction('FETCH_USER')
export function fetchUser(userId) {
    return (dispatch, getState) => {
        if (getState().user.items[userId]) {
            return Promise.resolve()
        }

        dispatch({ type: fetchUserAction.start })

        UserService.get(userId)
        .then(r => {
            const user = r.data
            dispatch({
                type: fetchUserAction.success,
                user, userId
            })
        })
        .catch(error => {
            dispatch({
                type: fetchUserAction.fail,
                error
            })
        })
    }
}
