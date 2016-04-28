import createAsyncAction from '../actions/createAsyncAction.js'
import PostService from '../api/post'

export var fetchPostAction = createAsyncAction('FETCH_POST');
export var fetchPost = groupId => {
    return (dispatch, getState) => {
        // const posts = getState().posts.items[groupId];
        // if (posts && posts.length) {
        //     return Promise.resolve();
        // }

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
                console.log(error);
                dispatch({
                    type: fetchPostAction.fail,
                    error
                })
            })
    }
}

export var fetchCommentAction = createAsyncAction('FETCH_POST_COMMENT');
export var fetchComment = (groupId, postId) => {
    return (dispatch, getState) => {
        // const comments = getState().comments.items[postId];
        // if (comments && comments.length) {
        //     return Promise.resolve();
        // }

        dispatch({ type: fetchCommentAction.start });

        return PostService(groupId).fetchComment(postId)
            .then(r => {
                dispatch({
                    type: fetchCommentAction.success,
                    items: r.data,
                    postId
                })
            })
            .catch(error => {
                dispatch({
                    type: fetchCommentAction.fail,
                    error
                })
            })
    }
}
