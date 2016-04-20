import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import promiseMiddleware from 'redux-promise'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import groups, { myGroups } from './group'
import assignments from './assignment'
import members from './member'
import lessons from './lesson'

export const initialState = {
    isLoading: false,
    isError: false,
    error: null,
    items: {}
}

const reducers = combineReducers({
    auth,
    groups,
    myGroups,
    lessons,
    assignments,
    members,
    routing: routerReducer
})

export const store = createStore(reducers,
    compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
    applyMiddleware(thunk)
);
