import React from 'react'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'
import { syncHistoryWithStore } from 'react-router-redux'

import App from '../components/App'
import Home from '../pages/user/Home'
import Groups from '../pages/group/Groups'
// import Group from '../pages/group/Group'

import MyProfile from '../pages/user/MyProfile'
import UserDetail from '../pages/user/UserDetail'
import MyAssignment from '../pages/user/MyAssignment'
import Notifications from '../pages/user/Notifications'

import MessageContainer from '../pages/message/MessageContainer'
import MessageList from '../pages/message/MessageList'
import MessageDetail from '../pages/message/MessageDetail'

import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import About from '../pages/other/About'
import AuthService from '../api/auth'
import UserService from '../api/user'
import {store} from '../reducers'

import GroupRoute from './group'

const browserHistory = useRouterHistory(createHashHistory)({queryKey: false});
// TODO: use browserHistory provided by react-router
const history = syncHistoryWithStore(browserHistory, store)

function isAuthenticated(nextState, replace) {
    if (!AuthService.isLoggedIn() && !UserService.getUserFromStore()) {
        replace({ pathname: '/login' });
    }
}

function isLoggedIn(nextState, replace) {
    if (AuthService.isLoggedIn() && UserService.getUserFromStore()) {
        replace({ pathname: '/' })
    }
}

const routes = (
    <Router history={history}>
        <Route name="app-route" path="/" component={App} onEnter={isAuthenticated}>
            <IndexRoute component={Home} />

            <Route path="groups" name="groups" component={Groups} />
            {/*<Route name="group-detail" path="groups/:groupId" component={Group} />*/}
            {GroupRoute}

            <Route name="my-profile" path="me" component={MyProfile} />
            <Route name="user-detail" path="users/:userId" component={UserDetail} />
            <Route name="my-assignment" path="assignments" component={MyAssignment} />
            <Route name="notifications" path="notifications" component={Notifications} />

            <Route path="messages" component={MessageContainer}>
                <IndexRoute component={MessageList} />
                <Route name="message-detail" path=":messageId" component={MessageDetail} />
            </Route>

            <Route name="about" path="about" component={About} />
        </Route>

        <Route name="login" path="/login" component={Login} onEnter={isLoggedIn} />
        <Route name="signup" path="/signup" component={Signup} />
    </Router>
);

export default routes
