import { fetchGroupAction, fetchMyGroupAction, fetchSingleGroupAction } from '../actions/group'

const initialState = {
    isLoading: false,
    isError: false,
    error: null,
    items: {}
}

const groups = (state = initialState, action) => {
    switch (action.type) {
        case fetchGroupAction.start:
        case fetchSingleGroupAction.start:
            return { ...state, isLoading: true }

        case fetchGroupAction.success:
            const { items } = state;
            for (const i of action.items) {
                items[i.id] = i
            }
            return {...state, isLoading: false, items }

        case fetchGroupAction.fail:
        case fetchSingleGroupAction.fail:
            return { ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }

        case fetchSingleGroupAction.success:
            const { items: is } = state;
            const { item } = action;
            is[item.id] = item;
            return { ...state, isLoading: false, items:is }

        default:
            return state
    }
}

export const myGroups = (state = {
    isLoading: false,
    isError: false,
    error: null,
    ids: []
    }, action) => {
    switch (action.type) {
        case fetchMyGroupAction.start:
            return { ...state, isLoading: true }
        case fetchMyGroupAction.success:
            return { ...state,
                isLoading: false,
                isError: false,
                error: null,
                ids: action.ids
            }
        case fetchMyGroupAction.fail:
            return { ...state, isError: true, error: action.error }
        default:
            return state
    }
}

export const getGroupByIds = (state, ids) => {
    return ids.map(id => {
        return state.groups.items[id]
    });
}

export const getMyGroups = (state) => {
    return getGroupByIds(state, state.myGroups.ids);
}

export default groups
