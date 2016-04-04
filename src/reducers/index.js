import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

function simpleReducer(state=[], action) {
    console.log('store created');
    return state;
}
const reducers = combineReducers({simpleReducer, routing: routerReducer})
const store = createStore(reducers);

exports.store = store
