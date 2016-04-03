import React from 'react'
import routes from './routes'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// TODO: create reducers
const store = createStore(() => {
    console.log('store created');
});

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
            {routes}
            </Provider>
        )
    }
}

export default Root
