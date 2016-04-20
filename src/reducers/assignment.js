import { fetchAssignmentAction } from '../actions/assignment.js'
import { initialState } from './index'

export const assignments = (state = initialState, action) => {
    switch (action.type) {
        case fetchAssignmentAction.start:
            return {...state, isLoading: true}
        case fetchAssignmentAction.success:
            const { items } = state;
            items[action.groupId] = action.items;
            return {...state,
                isLoading: false,
                isError: false,
                error: null,
                items
            }
        case fetchAssignmentAction.fail:
            return {...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        default:
            return state
    }
}

export var getAssignmentsGroup = (items, groupId) => {
    return items[groupId];
}

export default assignments
