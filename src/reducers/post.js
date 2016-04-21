import { fetchPostAction } from '../actions/post'

const initialState = {
    isLoading: false,
    isError: false,
    error: null,
    items: {}
}

const posts = (state = initialState, action) => {
    switch (action.type) {
        case fetchPostAction.start:
            return { ...state, isLoading: true }
        case fetchPostAction.success:
            const { items } = state;
            items[action.groupId] = action.items;
            return { ...state,
                isLoading: false,
                isError: false,
                items
            }
        case fetchPostAction.fail:
            return { ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }
        default:
            return state
    }
}

export default posts
