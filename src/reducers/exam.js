import { fetchExamAction } from '../actions/exam'

const exams = (state = {
    isLoading: false,
    isError: false,
    error: null,
    items: {}
}, action) => {
    switch (action.type) {
        case fetchExamAction.start:
            return {...state, isLoading: true}
        case fetchExamAction.success:
            const { items } = state
            items[action.groupId] = action.items
            return {...state,
                isLoading: false,
                isError: false,
                error: null,
                items
            }
        case fetchExamAction.fail:
            return {...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        case 'EXAM_ADD':
            const { items: examAdd } = state
            examAdd[action.groupId] = [ action.item, ...examAdd[action.groupId] ]
            return { ...state, items: examAdd }
        case 'EXAM_DELETE':
            const { items: deleteItem } = state
            deleteItem[action.groupId] = deleteItem[action.groupId]
                .filter(i => {
                    return i.id != action.id
                })
            return { ...state, items: deleteItem }
        default:
            return state
    }
}

export default exams