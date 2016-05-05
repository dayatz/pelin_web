import { fetchLessonAction } from '../actions/lesson'

const lessons = (state = {
    isLoading: false,
    isError: false,
    error: null,
    items: {}
}, action) => {
    switch (action.type) {
        case fetchLessonAction.start:
            return { ...state, isLoading: true}
        case fetchLessonAction.success:
            const { items } = state
            items[action.groupId] = action.items
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
        case 'LESSON_REMOVE':
            const { items: removeItems } = state
            removeItems[action.groupId] = removeItems[action.groupId]
                .filter(item => {
                    return item.id != action.id
                })
            return { ...state, items: removeItems }
        default:
            return state

    }
}

export default lessons
