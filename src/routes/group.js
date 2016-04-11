import React from 'react'
import {Route, IndexRoute} from 'react-router'

import GroupContainer from '../pages/group/GroupContainer'
import Groups from '../pages/group/Groups'
import GroupDetailContainer from '../pages/group/GroupDetailContainer'
import Posts from '../pages/group/Posts'
import Members from '../pages/group/Members'

import LessonContainer from '../pages/group/lessons/LessonContainer'
import Lessons from '../pages/group/lessons/Lessons'
import LessonAdd from '../pages/group/lessons/LessonAdd'

import AssignmentContainer from '../pages/group/assignments/AssignmentContainer'
import Assignments from '../pages/group/assignments/Assignments'
import AssignmentDetail from '../pages/group/assignments/AssignmentDetail'
import AssignmentAdd from '../pages/group/assignments/AssignmentAdd'

const GroupRoute = (
    <Route path="groups" name="groups" component={GroupContainer}>
        <IndexRoute component={Groups} />

        <Route name="group-detail" path=":groupId" component={GroupDetailContainer}>
            <IndexRoute component={Posts} />
            <Route name="members" path="members" component={Members} />

            <Route name="lessons" path="lessons" component={LessonContainer}>
                <IndexRoute copmonent={Lessons} />
                <Route name="lesson-add" path="add" component={LessonAdd} />
            </Route>

            <Route name="assignments" path="assignments" component={AssignmentContainer}>
                <IndexRoute component={Assignments} />
                <Route name="assignment-detail" path=":assignmentId" component={AssignmentDetail} />
                <Route name="assignment-add" path="add" component={AssignmentAdd} />
            </Route>
        </Route>
    </Route>
)

export default GroupRoute
