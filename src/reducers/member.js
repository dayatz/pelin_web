import { fetchMemberAction, fetchPendingAction } from '../actions/member'
import { initialState } from './index'

const members = (state = initialState(), action) => {
    switch (action.type) {
        case fetchMemberAction.start:
            return { ...state, isLoading: true }
        case fetchMemberAction.success:
            const { items } = state;
            items[action.groupId] = action.items;
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
        default:
            return state
    }
}

export const pendings = ( state = initialState(), action) => {
    switch (action.type) {
        case fetchPendingAction.start:
            return { ...state, isLoading: true }
        case fetchPendingAction.success:
            const { items } = state;
            items[action.groupId] = action.items;
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
        default:
            return state
    }
}

export default members
