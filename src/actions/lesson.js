import createAsyncAction from './createAsyncAction'
import LessonService from '../api/lesson'

export var fetchLessonAction = createAsyncAction("FETCH_LESSONS")

export var fetchLessons = groupId => {
    return (dispatch, getState) => {
        // const lessons = getState().lessons.items[groupId]
        // if (lessons && lessons.length) {
        //     return Promise.resolve()
        // }

        dispatch({ type: fetchLessonAction.start })

        return LessonService(groupId).fetchAll()
            .then(r => {
                dispatch({
                    type: fetchLessonAction.success,
                    items: r.data,
                    groupId
                })
            })
            .catch(error => {
                dispatch({
                    type: fetchLessonAction.fail,
                    error
                })
            })
    }
}

export var lessonRemoveAction = (groupId, id) => {
    return {
        type: 'LESSON_REMOVE',
        groupId,
        id
    }
}
