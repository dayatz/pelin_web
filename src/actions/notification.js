import createAsyncAction from './createAsyncAction.js'
import UserService from '../api/user'


export var notificationAction = createAsyncAction('NOTIFICATION')
export function fetchNotification() {
    return (dispatch, getState) => {
        if (getState().notification.items.length) {
            return Promise.resolve()
        }

        dispatch({ type: notificationAction.start })

        UserService.getNotifications()
            .then(r => {
                dispatch({
                    type: notificationAction.success,
                    items: r.data
                })
            })
            .catch(error => {
                dispatch({
                    type: notificationAction.fail,
                    error
                })
            })
    }
}

export function addNotification(item) {
    return {
        type: 'NOTIFICATION_ADD',
        item
    }
}

export function cleanNotification() {
    return {
        type: 'NOTIFICATION_CLEAN'
    }
}

export function markReadNotification() {
    return {
        type: 'NOTIFICATION_READ'
    }
}