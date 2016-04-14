import {fetchGroupAction} from '../actions/group'

const initialState = {
    isLoading: false,
    isError: false,
    error: null,
    data: []
}

const groups = (state = initialState, action) => {
    switch (action.type) {
        case fetchGroupAction.start:
            return Object.assign({}, state, {
                isLoading: true
            })
        case fetchGroupAction.success:
            return Object.assign({}, state, {
                isLoading: false,
                data: action.data
            })
        case fetchGroupAction.fail:
            return Object.assign({}, state, {
                isLoading: false,
                isError: true,
                error: action.error
            })
        default:
            return state
    }
}

export default groups
