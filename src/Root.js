import React from 'react'
import routes from './routes'
import { Provider, connect } from 'react-redux'

import {store} from './reducers'

const Root = () => {
    return (
        <Provider store={store}>{routes}</Provider>
    )
}

export default Root
