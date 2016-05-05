import createAsyncAction from '../actions/createAsyncAction'
import GroupService from '../api/group'
import { getGroupByIds } from '../reducers/group'

export var fetchGroupAction = createAsyncAction('FETCH_GROUP')
export var updateGroupAction = createAsyncAction('UPDATE_GROUP')
export var deleteGroupAction = createAsyncAction('DELETE_GROUP')

export function fetchAllGroup() {
    return (dispatch, getState) => {
        // const groups = getState().groups.items
        // if (groups.length) return Promise.resolve()

        dispatch({ type: fetchGroupAction.start})

        return GroupService.fetchAll()
            .then((r) => {
                const items = r.data
                dispatch({
                    type: fetchGroupAction.success,
                    items
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: fetchGroupAction.fail,
                    error
                })
            })
    }
}

export var fetchMyGroupAction = createAsyncAction('FETCH_MYGROUP')
export function fetchMyGroups() {
    return (dispatch, getState) => {
        const ids = getState().myGroups.ids
        if (ids.length) return Promise.resolve()

        dispatch({ type: fetchMyGroupAction.start })

        return GroupService.myGroup()
            .then((r) => {
                const data = r.data
                const ids = data.map(i => { return i.id })

                const groupItems = getState().groups.items
                data.map(d => {
                    if (!groupItems[d.id]) {
                        dispatch({
                            type: fetchSingleGroupAction.success,
                            item: d
                        })
                    }
                })
                // dispatch({
                //     type: fetchGroupAction.success,
                //     items: data
                // })

                dispatch({
                    type: fetchMyGroupAction.success,
                    ids
                })
            })
            .catch((error) => {
                dispatch({
                    type: fetchMyGroupAction.fail,
                    error
                })
            })
    }
}

export var fetchSingleGroupAction = createAsyncAction('FETCH_SINGLE_GROUP')
export function fetchSingleGroup(groupId) {
    return (dispatch, getState) => {
        const group = getState().groups.items[groupId]
        if (group) return Promise.resolve()

        dispatch({ type: fetchSingleGroupAction.start })

        return GroupService.fetch(groupId)
            .then((r) => {
                dispatch({
                    type: fetchSingleGroupAction.success,
                    item: r.data
                })
            })
            .catch((error) => {
                console.error(error)
                dispatch({
                    type: fetchSingleGroupAction.fail,
                    error
                })
            })
    }
}

export var addGroupAction = (group) => {
    return {
        type: 'ADD_GROUP',
        item: group
    }
}

export var addMyGroupAction = (id) => {
    return {
        type: 'ADD_MY_GROUP',
        id
    }
}

export var myGroupLeaveAction = (id) => {
    return {
        type: 'MYGROUP_LEAVE',
        id
    }
}

export var groupRemoveAction = (id) => {
    return {
        type: 'GROUP_REMOVE',
        id
    }
}

export var updateGroupAction = (id, item) => {
    return {
        type: 'GROUP_UPDATE',
        id, item
    }
}
