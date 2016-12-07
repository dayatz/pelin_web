import createAsyncAction from './createAsyncAction'
import ExamService from '../api/exam'

export var fetchExamAction = createAsyncAction("FETCH_EXAM")
export var fetchAllExam = groupId => {
    return dispatch => {

        dispatch({ type: fetchExamAction.start })

        return ExamService(groupId).all()
            .then(r => {
                dispatch({
                    type: fetchExamAction.success,
                    items: r.data,
                    groupId
                })
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: fetchExamAction.fail,
                    error
                })
            })
    }
}