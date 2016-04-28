import React from 'react'
import {Route, IndexRoute} from 'react-router'

import GroupDetail from '../pages/group/GroupDetail'
import Posts from '../pages/group/Posts'
import Members from '../pages/group/Members'

import LessonContainer from '../pages/group/LessonContainer'
import Lessons from '../pages/group/Lessons'
import LessonAdd from '../pages/group/LessonAdd'

import AssignmentContainer from '../pages/group/AssignmentContainer'
import Assignments from '../pages/group/Assignments'
import AssignmentDetail from '../pages/group/AssignmentDetail'
import AssignmentAdd from '../pages/group/AssignmentAdd'

const GroupRoute = (
    <Route name="group-detail" path="groups/:groupId" component={GroupDetail}>
        <IndexRoute component={Posts} />
        <Route name="members" path="members" component={Members} />

        <Route name="lessons" path="lessons" component={LessonContainer}>
            <IndexRoute component={Lessons} />
            <Route name="lesson-add" path="add" component={LessonAdd} />
        </Route>

        <Route name="assignments" path="assignments" component={AssignmentContainer}>
            <IndexRoute component={Assignments} />
            <Route name="assignment-add" path="add" component={AssignmentAdd} />
            <Route name="assignment-detail" path=":assignmentId" component={AssignmentDetail} />
        </Route>
    </Route>
)

export default GroupRoute
