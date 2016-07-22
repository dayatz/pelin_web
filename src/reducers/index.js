import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import promiseMiddleware from 'redux-promise'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import groups, { myGroups } from './group'
import assignments, { myAssignments, submits } from './assignment'
import members, { pendings } from './member'
import lessons from './lesson'
import posts, { comments } from './post'
import conversation, { messages } from './message.js'
import user from './user'
import notification from './notification'
import video from './video'
import exams from './exam'


const reducers = combineReducers({
    auth,
    groups,
    myGroups,
    posts,
    comments,
    lessons,
    assignments, myAssignments, submits,
    members, pendings,
    conversation, messages,
    user, notification, video,
    exams,
    routing: routerReducer
})

const appReducers = (state, action) => {
    if (action.type == 'USER_LOGOUT') {
        state = undefined
        console.log(state)
    }
    return reducers(state, action)
}

export const store = createStore(appReducers,
    compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
    applyMiddleware(thunk)
)
