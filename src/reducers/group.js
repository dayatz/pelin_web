import { fetchGroupAction, fetchMyGroupAction, fetchSingleGroupAction } from '../actions/group'

const groups = (state = {
        isLoading: false,
        isError: false,
        error: null,
        items: {}
    }, action) => {
    switch (action.type) {
        case fetchGroupAction.start:
        case fetchSingleGroupAction.start:
            return { ...state, isLoading: true }

        case fetchGroupAction.success:
            const { items } = state
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
            const { items: is } = state
            const { item } = action
            is[item.id] = item
            return { ...state, isLoading: false, items:is }

        case 'ADD_GROUP':
            const { items: newGroup } = state
            newGroup[action.item.id] = action.item
            return { ...state, items: newGroup}

        case 'GROUP_REMOVE':
            const { items: groupRemove } = state
            delete groupRemove[action.id]
            return { ...state, items:groupRemove }

        case 'GROUP_UPDATE':
            const { items: groupUpdate } = state
            groupUpdate[action.id] = action.item
            return { ...state, items: groupUpdate }

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
        case 'ADD_MY_GROUP':
            const { ids } = state
            ids.unshift(action.id)
            return {  ...state, ids }
        case 'MYGROUP_LEAVE':
            const { ids: leave } = state
            const newIds = leave.filter(id => {
                return id != action.id
            })
            return { ...state, ids: newIds }
        default:
            return state
    }
}

export const getGroupByIds = (state, ids) => {
    return ids.map(id => {
        return state.groups.items[id]
    })
}

export const getMyGroups = (state) => {
    return getGroupByIds(state, state.myGroups.ids)
}

export default groups
