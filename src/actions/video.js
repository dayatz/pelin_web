import createAsyncAction from './createAsyncAction.js'
import VideoService from '../api/video'

export var fetchVideoAction = createAsyncAction('FETCH_VIDEO')

export function fetchVideo() {
    return (dispatch, getState) => {

        dispatch({ type: fetchVideoAction.start})

        return VideoService.fetchAll()
            .then((r) => {
                const items = r.data
                dispatch({
                    type: fetchVideoAction.success,
                    items
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: fetchVideoAction.fail,
                    error
                })
            })
    }
}