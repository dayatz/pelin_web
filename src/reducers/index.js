import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import promiseMiddleware from 'redux-promise'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import groups, { myGroups } from './group'
import assignments, { submits } from './assignment'
import members, { pendings } from './member'
import lessons from './lesson'
import posts, { comments } from './post'

export const initialState = () => {
    return {
        isLoading: false,
        isError: false,
        error: null,
        items: {}
    }
}

const reducers = combineReducers({
    auth,
    groups,
    myGroups,
    posts,
    comments,
    lessons,
    assignments, submits,
    members, pendings,
    routing: routerReducer
})

export const store = createStore(reducers,
    compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
    applyMiddleware(thunk)
);
