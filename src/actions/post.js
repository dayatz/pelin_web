import createAsyncAction from '../actions/createAsyncAction.js'
import PostService from '../api/post'

export var fetchPostAction = createAsyncAction('FETCH_POST');
export var fetchPost = groupId => {
    return (dispatch, getState) => {
        const posts = getState().posts.items[groupId];
        if (posts && posts.length) {
            return Promise.resolve();
        }

        dispatch({ type: fetchPostAction.start });

        return PostService(groupId).fetchAll()
            .then(r => {
                dispatch({
                    type: fetchPostAction.success,
                    items: r.data,
                    groupId
                })
            })
            .catch(error => {
                dispatch({
                    type: fetchPostAction.fail,
                    error
                })
            })
    }
}
