const createAsyncAction = type => {
    return {
        init: (payload) => {
            return {
                type,
                payload,
                meta: {
                    async: true
                }
            }
        },
        start: type + '_START',
        success: type + '_SUCCESS',
        fail: type + '_FAIL'
    }
}

export default createAsyncAction
