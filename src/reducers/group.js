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
    data: []
}

const groups = (state = initialState, action) => {
    switch (action.type) {
        case fetchGroupAction.start:
            return Object.assign({}, state, {
                isLoading: true
            })
        case fetchGroupAction.success:
            return Object.assign({}, state, {
                isLoading: false,
                data: action.data
            })
        case fetchGroupAction.fail:
            return Object.assign({}, state, {
                isLoading: false,
                isError: true,
                error: action.error
            })
        default:
            return state
    }
}

const getMyGroups = (groups, ids) => {
    { ...groups }
}

export const myGroups = (state = initialState, action) => {
    switch (action.type) {
        case fetchMyGroupAction.start:

        default:

    }
}

export default groups
