import createAsyncAction from '../actions/createAsyncAction.js'
import MemberService from '../api/member'

export var fetchMemberAction = createAsyncAction('FETCH_MEMBERS');
export var fetchMembers = groupId => {
    return (dispatch, getState) => {
        // const members = getState().members.items[groupId];
        // if (members && members.length) {
        //     return Promise.resolve();
        // }

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

export var fetchPendingAction = createAsyncAction('FETCH_PENDINGS_MEMBER');
export var fetchPendings = groupId => {
    return (dispatch, getState) => {
        // const pendings = getState().pendings.items[groupId];
        // if (pendings && pendings.length) {
        //     return Promise.resolve();
        // }

        dispatch({ type: fetchPendingAction.start });

        return MemberService(groupId).fetchAllPendings()
            .then(r => {
                dispatch({
                    type: fetchPendingAction.success,
                    items: r.data,
                    groupId
                })
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: fetchPendingAction.fail,
                    error
                })
            })
    }
}

export var kickMember = (groupId, memberId) => {
    console.log('[action] dispatching kick')
    return {
        type: 'KICK_MEMBER',
        groupId,
        memberId
    }
}
