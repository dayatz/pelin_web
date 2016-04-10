import {fetchGroupAction} from '../actions/group'

const initialState = {
    loading: false,
    error: false,
    errorData: null,
    data: []
}

const groups = (state = initialState, action) => {
    switch (action.type) {
        case fetchGroupAction.start:
            return Object.assign({}, state, {
                loading: true
            })
        case fetchGroupAction.success:
            return Object.assign({}, state, {
                loading: false,
                data: action.data
            })
        case fetchGroupAction.fail:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorData: action.data
            })
        default:
            return state
    }
}

export default groups
