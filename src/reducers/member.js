import { initialState } from './index'
import { fetchMemberAction } from '../actions/member'

const members = (state=initialState, action) => {
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

export default members
