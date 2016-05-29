import { fetchMessageAction, fetchConversationAction } from '../actions/message'

const conversation = (state = {
        isLoading: false,
        isError: false,
        error: null,
        items: {}
    }, action) => {
    switch(action.type) {
        case fetchConversationAction.start:
            return { ...state, isLoading: true }

        case fetchConversationAction.success:
            const { items } = state
            for (const i of action.items) {
                items[i.id] = i
            }
            return {...state, isLoading: false, items }

        case fetchConversationAction.fail:
            return { ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }

        case 'CONVERSATION_REMOVE':
            const { items: conversationRemove } = state
            delete conversationRemove[action.userId]
            for (var id in conversationRemove) {
                if (conversationRemove[id].user_id  == action.userId) {
                    delete conversationRemove[id]
                }
            }
            return { ...state, items: conversationRemove }

        case 'CONVERSATION_ADD':
            let { items: conversationAdd } = state
            conversationAdd.unshift(action.item)
            return {...state, items: conversationAdd }

        default:
            return state
    }
}

export const messages = (state = {
        isLoading: false,
        isError: false,
        error: null,
        items: {}
    }, action) => {
    switch(action.type) {
        case fetchMessageAction.start:
            return { ...state, isLoading: true }

        case fetchMessageAction.success:
            const { items } = state
            items[action.userId] = action.items
            return {...state, isLoading: false, items }

        case fetchMessageAction.fail:
            return { ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        case 'MESSAGE_SEND':
            const { items: messageSend } = state
            messageSend[action.userId].push(action.item)
            return { ...state, items: messageSend }
        case 'CONVERSATION_REMOVE':
            const { items: conversationRemove } = state
            delete conversationRemove[action.userId]
            return { ...state, items: conversationRemove }
        default:
            return state
    }
}

export default conversation
