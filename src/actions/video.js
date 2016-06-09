import createAsyncAction from './createAsyncAction.js'
import VideoService from '../api/video'

export var fetchVideoAction = createAsyncAction('FETCH_VIDEO')

export function fetchVideo() {
    return (dispatch, getState) => {

        dispatch({ type: fetchGroupAction.start})

        return VideoService.fetchAll()
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