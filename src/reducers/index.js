import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import promiseMiddleware from 'redux-promise'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import groups, { myGroups } from './group'

const reducers = combineReducers({
    auth,
    groups,
    myGroups,
    routing: routerReducer
})

const store = createStore(reducers,
    compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
    applyMiddleware(thunk)
);

exports.store = store
