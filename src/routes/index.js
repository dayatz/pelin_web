import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import GroupRoute from './group'


const routes = (
    <Router history={hashHistory}>
        <Route name="app-route" path="/" component={App}>
            <IndexRoute component={Home} />

            {GroupRoute}

            <Route name="my-profile" path="me" component={MyProfile} />
            <Route name="user-detail" path="users/:userId" component={UserDetail} />
            <Route name="my-assignment" path="assignments" component={MyAssignment} />
            <Route name="notifications" path="notifications" component={Notifications} />

            <Route path="messages" component={}>
                <IndexRoute component= />
                <Route name="message-detail" path=":messageId" component={} />
            </Route>

            <Route name="login" path="login" component={Login} />
            <Route name="signup" path="signup" component={Signup} />
            <Route name="about" path="about" component={About} />
        </Route>
    </Router>
)
