import createAsyncAction from '../actions/createAsyncAction'
import GroupService from '../api/group'

export var fetchGroupAction = createAsyncAction('FETCH_GROUP');
export var fetchMyGroupAction = createAsyncAction('FETCH_MYGROUP');
export var updateGroupAction = createAsyncAction('UPDATE_GROUP');
export var deleteGroupAction = createAsyncAction('DELETE_GROUP');
export var createGroupAction = createAsyncAction('CREATE_GROUP');


export function fetchAllGroup() {
    return (dispatch, getState) => {
        const groups = getState().groups.items;
        if (groups.length) return Promise.resolve();

        dispatch({ type: fetchGroupAction.start});

        return GroupService.fetchAll()
            .then((r) => {
                const items = r.data;
                dispatch({
                    type: fetchGroupAction.success,
                    items
                })
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: fetchGroupAction.fail,
                    error
                })
            })
    }
}

export function fetchMyGroups() {
    return (dispatch, getState) => {
        const groups = getState().myGroups.items;
        if (groups.length) return Promise.resolve();

        dispatch({ type: fetchMyGroupAction.start });

        return GroupService.myGroup()
            .then((r) => {
                const items = r.data;
                dispatch({
                    type: fetchMyGroupAction.success,
                    items
                });
            })
            .catch((error) => {
                dispatch({
                    type: fetchMyGroups.fail,
                    error
                })
            })
    }
}
