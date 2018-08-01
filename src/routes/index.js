import React from 'react'

import Router from 'react-router/lib/Router'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
// import browserHistory from 'react-router/lib/browserHistory'
// import useRouterHistory from 'react-router/lib/useRouterHistory'
import {createHistory, useBasename} from 'history'

import createHashHistory from 'history/lib/createHashHistory'
import { syncHistoryWithStore } from 'react-router-redux'

import App from '../components/App'
import Home from '../pages/user/Home'
import Groups from '../pages/group/Groups'

import MyProfile from '../pages/user/MyProfile'
import UserDetail from '../pages/user/UserDetail'

import MyAssignment from '../pages/user/MyAssignment'
import Notifications from '../pages/user/Notifications'

import MessageNoSelected from '../pages/message/MessageNoSelected'
import Conversations from '../pages/message/Conversations'
import MessageDetail from '../pages/message/MessageDetail'

import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import About from '../pages/other/About'

import VideosPage from '../pages/vidoes/VideosPage'
import Videos from '../pages/vidoes/Videos'
import VideosAdd from '../pages/vidoes/VideosAdd'
import VideosAuth from '../pages/vidoes/VideosAuth'

import AuthService from '../api/auth'
import UserService from '../api/user'
import {store} from '../reducers'

import GroupRoute from './group'

// const browserHistory = useRouterHistory(createHashHistory)({queryKey: false})
// TODO: use browserHistory provided by react-router
// const history = syncHistoryWithStore(browserHistory, store)
const myhistory = useBasename(createHistory)({
    basename: '/'
})
const history = syncHistoryWithStore(myhistory, store)

function isAuthenticated(nextState, replace) {
    if (!AuthService.isLoggedIn() && !UserService.getUserFromStore()) {
        replace({ pathname: '/login' })
    }
}

function isLoggedIn(nextState, replace) {
    if (AuthService.isLoggedIn() && UserService.getUserFromStore()) {
        replace({ pathname: '/' })
    }
}

function forStudent(nextState, replace) {
    if (UserService.getUserFromStore().is_teacher) {
        replace({ pathname: '/' })
    }
}

function forTeacher(nextState, replace) {
    if (!UserService.getUserFromStore().is_teacher) {
        replace({ pathname: '/' })
    }
}

const routes = (
    <Router history={history}>
        <Route name="app-route" path="/" component={App} onEnter={isAuthenticated}>
            <IndexRoute component={Home} />

            <Route path="groups" name="groups" component={Groups} onEnter={forStudent} />
            {GroupRoute}

            <Route name="profile" path="profile" component={MyProfile} />
            
            <Route name="user-detail" path="users/:userId" component={UserDetail} />

            <Route name="my-assignment" path="assignments" component={MyAssignment} />
            <Route name="notifications" path="notifications" component={Notifications} />

            <Route name="videos" path="videos" component={VideosPage} onEnter={forTeacher}>
                <IndexRoute component={Videos} />
                <Route name="videos-add" path="add" component={VideosAdd} />
                <Route name="videos-oauth" path="add/oauth" component={VideosAuth} />
            </Route>

            <Route path="messages" component={Conversations}>
                <IndexRoute component={MessageNoSelected} />
                <Route name="message-detail" path=":messageId" component={MessageDetail} />
            </Route>

            <Route name="about" path="about" component={About} />
        </Route>

        <Route name="login" path="/login" component={Login} onEnter={isLoggedIn} />
        <Route name="signup" path="/signup" component={Signup} />
    </Router>
)

export default routes
