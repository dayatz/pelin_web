import { fetchMemberAction, fetchPendingAction } from '../actions/member'
import { initialState } from './index'

const members = (state = {
        isLoading: false,
        isError: false,
        error: null,
        items: {}
    }, action) => {
    switch (action.type) {
        case fetchMemberAction.start:
            return { ...state, isLoading: true }
        case fetchMemberAction.success:
            const { items } = state
            items[action.groupId] = action.items
            return { ...state,
                isLoading: false,
                isError: false,
                items
            }
        case fetchMemberAction.fail:
            return { ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        case 'ADD_MEMBER':
            const { items: addItems } = state
            addItems[action.groupId].unshift(action.item)
            return { ...state, items: addItems }
        case 'KICK_MEMBER':
            const { items: removeItems } = state

            removeItems[action.groupId] = removeItems[action.groupId]
                .filter(item => {
                    return item.id != action.memberId
                })

            return { ...state, items: removeItems}
        default:
            return state
    }
}

export const pendings = ( state = {
        isLoading: false,
        isError: false,
        error: null,
        items: {}
    }, action) => {
    switch (action.type) {
        case fetchPendingAction.start:
            return { ...state, isLoading: true }
        case fetchPendingAction.success:
            const { items } = state
            items[action.groupId] = action.items
            return { ...state,
                isLoading: false,
                isError: false,
                items
            }
        case fetchPendingAction.fail:
            return { ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        case 'PENDING_APPROVE':
            const { items: pendingItems } = state

            pendingItems[action.groupId] = pendingItems[action.groupId]
                .filter(item => {
                    return item.id != action.id
                })

            return { ...state, items: pendingItems }
        case 'PENDING_APPROVE_ALL':
            const { items: approveAll } = state
            delete approveAll[action.groupId]
            return { ...state, items: approveAll}
        default:
            return state
    }
}

export default members
