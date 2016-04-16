import { fetchGroupAction, fetchMyGroupAction } from '../actions/group'

/*
    user load to home page:
        - get groups from groups store based on myGroups ids
        if no ids:
            - return response
            - store those ids to myGroups store

    user load to /groups:
        - get groups from store
        if no groups:
            - return response
            - save that response to groups store

*/

const initialState = {
    isLoading: false,
    isError: false,
    error: null,
    items: []
}

const groups = (state = initialState, action) => {
    switch (action.type) {
        case fetchGroupAction.start:
            return { ...state, isLoading: true }
        case fetchGroupAction.success:
            return {...state,
                    isLoading: false,
                    items: action.items
                }
        case fetchGroupAction.fail:
            return { ...state,
                isLoading: false,
                isError: true,
                error: action.error }
        default:
            return state
    }
}

export const myGroups = (state = initialState, action) => {
    switch (action.type) {
        case fetchMyGroupAction.start:
            return { ...state, isLoading: true }
        case fetchMyGroupAction.success:
            return { ...state,
                isLoading: false,
                isError: false,
                error: null,
                items: action.items
            }
        case fetchMyGroupAction.fail:
            return { ...state, isError: true, error: action.error }
        default:
            return state
    }
}

export const groupById = (state, id) => {
    return state.groups.find(group => {
        return group.id == id
    })
}

export default groups
