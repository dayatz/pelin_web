import { notificationAction } from '../actions/notification'

const notification = (state = {
        isLoading: false,
        isError: false,
        error: null,
        items: []
    }, action) => {

    switch(action.type) {
        case notificationAction.start:
            return { ...state, isLoading: true }
        case notificationAction.success:
            return { ...state, isLoading: false, items: action.items }
        case notificationAction.fail:
            return { ...state, isLoading: false, isError: true, error: action.error }
        case 'NOTIFICATION_ADD':
            const { items: notificationAdd } = state
            notificationAdd.unshift(action.item)
            return { ...state, items: notificationAdd }
        case 'NOTIFICATION_CLEAN':
            return {...state, items:[]}
        case 'NOTIFICATION_READ':
            // const { items: notificationRead } = state
            const notificationRead = state.items.map(i => {
                return {...i, unread: false}
            })
            return {...state, items: notificationRead}
        default:
            return state
    }
}

export default notification
