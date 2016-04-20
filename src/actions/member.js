import createAsyncAction from '../actions/createAsyncAction.js'
import MemberService from '../api/member'

export var fetchMemberAction = createAsyncAction('FETCH_MEMBERS');
export var fetchMembers = groupId => {
    return (dispatch, getState) => {
        const members = getState().members.items[groupId];
        if (members && members.length) {
            return Promise.resolve();
        }

        dispatch({ type: fetchMemberAction.start });

        return MemberService(groupId).fetchAll()
            .then(r => {
                dispatch({
                    type: fetchMemberAction.success,
                    items: r.data,
                    groupId
                })
            })
            .catch(error => {
                dispatch({
                    type: fetchMemberAction.fail,
                    error
                })
            })
    }
}
