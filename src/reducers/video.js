import { fetchVideoAction } from '../actions/video'


const video = (state = {
        isLoading: false,
        isError: false,
        error: null,
        items: {}
    }, action) => {
    switch (action.type) {
        case fetchVideoAction.start:
            return { ...state, isLoading: true }

        case fetchVideoAction.success:
            const { items } = state
            for (const i of action.items) {
                items[i.id] = i
            }
            return {...state, isLoading: false, items }

        case fetchVideoAction.fail:
            return { ...state,
                isLoading: false,
                isError: true,
                error: action.error
            }

        default:
            return state
    }
}

export default video
