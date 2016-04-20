import { fetchLessonAction } from '../actions/lesson'
import { initialState } from './index'

const lessons = (state = initialState, action) => {
    switch (action.type) {
        case fetchLessonAction.start:
            return { ...state, isLoading: true}
        case fetchLessonAction.success:
            const { items } = state;
            items[action.groupId] = action.items;
            return {...state,
                isLoading: false,
                isError: false,
                error: null,
                items
            }
        case fetchLessonAction.fail:
            return { ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        default:
            return state

    }
}

export default lessons
