import { fetchUserAction } from '../actions/user'


const user = (state = {
        isLoading: false,
        isError: false,
        error: null,
        items: {}
    }, action) => {
    switch (action.type) {
        case fetchUserAction.start:
            return { ...state, isLoading: true }

        case fetchUserAction.success:
            const { items } = state
            items[action.userId] = action.user
            return {...state, isLoading: false, items }

        case fetchUserAction.fail:
            return { ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }

        default:
            return state
    }
}

export default user
