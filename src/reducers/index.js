// in this file, combine all reducers to produce store

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer } from 'react-router-redux'
import auth from './auth'

function simpleReducer(state=[], action) {
    console.log('store created');
    return state;
}

const reducers = combineReducers({
    simpleReducer,
    auth,
    routing: routerReducer
})

const store = createStore(reducers,
    compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
    applyMiddleware(thunk)
);

exports.store = store
