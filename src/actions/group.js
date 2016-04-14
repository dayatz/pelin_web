import { createAsyncAction } from '../config/createAsyncAction'
import GroupService from '../api/group'

export var fetchGroupAction = createAsyncAction('FETCH_GROUP');
export var fetchMyGroupAction = createAsyncAction('FETCH_MYGROUP');
export var updateGroupAction = createAsyncAction('UPDATE_GROUP');
export var deleteGroupAction = createAsyncAction('DELETE_GROUP');
export var createGroupAction = createAsyncAction('CREATE_GROUP');


export function fetchAllGroup() {
    return dispatch => {
        dispatch({ type: fetchGroupAction.start});

        return GroupService.fetchAll()
            .then((r) => {
                dispatch({
                    type: fetchGroupAction.success,
                    data: r.data
                })
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: fetchGroupAction.fail,
                    error: err
                })
            })
    }
}

export function fetchMyGroups() {
    return dispatch => {
        dispatch({ type: fetchMyGroupAction.start });

        return GroupService.myGroup()
            .then((r) => {
                console.log(r);
                dispatch({
                    type: fetchMyGroupAction.success,
                    data: r.data
                })
            })
    }
}
