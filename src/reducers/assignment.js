import { fetchAssignmentAction, fetchSubmittedAction, fetchMyAssignmentAction } from '../actions/assignment.js'

const initialState = {
    isLoading: false,
    isError: false,
    error: null,
    items: {}
}

const assignments = (state = initialState, action) => {
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
        case 'ASSIGNMENT_ADD':
            const { items: assignmentAdd } = state;
            assignmentAdd[action.groupId] = [ action.item, ...assignmentAdd[action.groupId] ]
            return {
                ...state, items: assignmentAdd
            }
        default:
            return state
    }
}

export var getAssignmentsGroup = (items, groupId) => {
    return items[groupId];
}

export default assignments

export const submits = (state = {
    isLoading: false,
    isError: false,
    error: null,
    items: {}
}, action) => {
    switch (action.type) {
        case fetchSubmittedAction.start:
            return {...state, isLoading: true}
        case fetchSubmittedAction.success:
            const { items } = state;
            items[action.assignmentId] = action.items;
            return {...state,
                isLoading: false,
                isError: false,
                error: null,
                items
            }
        case fetchSubmittedAction.fail:
            return {...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        default:
            return state
    }
}

export var myAssignments = (state = {
    isLoading: false,
    isError: false,
    error: null,
    items: []
}, action) => {
    switch (action.type) {
        case fetchMyAssignmentAction.start:
            return {...state, isLoading: true}
        case fetchMyAssignmentAction.success:
            return {...state, isLoading: false, items: action.items }
        case fetchMyAssignmentAction.fail:
            return {...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        default:
            return state
    }
}
