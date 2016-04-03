import React from 'react'
import routes from './routes'
// import { Provider } from 'react-redux'


class Root extends React.Component {
    render() {
        return (
            // TODO: <Provider store={store}>
            {routes}
            // </Provider>
        )
    }
}

export default Root
