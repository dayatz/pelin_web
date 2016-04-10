import { createAsyncAction } from '../config/createAsyncAction'
import GroupService from '../api/group'

export var fetchGroupAction = createAsyncAction('FETCH_GROUP');


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
                    data: err
                })
            })
    }
}
