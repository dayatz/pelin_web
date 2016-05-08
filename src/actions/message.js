import createAsyncAction from '../actions/createAsyncAction'
import MessageService from '../api/message'

export var fetchConversationAction = createAsyncAction('FETCH_CONVERSATION')
export function fetchConversation() {
    return (dispatch, getState) => {
        // const groups = getState().groups.items
        // if (groups.length) return Promise.resolve()

        dispatch({ type: fetchConversationAction.start})

        return MessageService.fetchConversation()
            .then((r) => {
                const items = r.data
                dispatch({
                    type: fetchConversationAction.success,
                    items
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: fetchConversationAction.fail,
                    error
                })
            })
    }
}

export var fetchMessageAction = createAsyncAction('FETCH_MESSAGE')
export function fetchMessage(userId) {
    return (dispatch, getState) => {
        // const groups = getState().groups.items
        // if (groups.length) return Promise.resolve()

        dispatch({ type: fetchMessageAction.start})

        return MessageService.fetchMessage(userId)
            .then((r) => {
                const items = r.data
                dispatch({
                    type: fetchMessageAction.success,
                    items,
                    userId
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: fetchMessageAction.fail,
                    error
                })
            })
    }
}

export const sendMsgAction = (userId, item) => {
    return {
        type: 'MESSAGE_SEND',
        userId, item
    }
}
