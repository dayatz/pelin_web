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
import AssignmentDetailContainer from '../pages/group/AssignmentDetailContainer'
import AssignmentAdd from '../pages/group/AssignmentAdd'
import AssignmentEdit from '../pages/group/AssignmentEdit'

import ExamContainer from '../pages/group/ExamContainer'
import Exams from '../pages/group/Exams'
import ExamDetailContainer from '../pages/group/ExamDetailContainer'
import ExamDetail from '../pages/group/ExamDetail'
import ExamAnswer from '../pages/group/ExamAnswer'
import ExamQuestions from '../pages/group/ExamQuestions'

import { forTeacher, forStudent } from './index'

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
            <Route name="assignment-detail" path=":assignmentId" component={AssignmentDetailContainer}>
                <IndexRoute component={AssignmentDetail} />
                <Route name="assignment-edit" path="edit" component={AssignmentEdit} />
            </Route>
        </Route>

        <Route name="exams" path="exams" component={ExamContainer}>
            <IndexRoute component={Exams} />
            <Route name="exam-detail" path=":examId" component={ExamDetailContainer}>
                <IndexRoute component={ExamDetail} />
                <Route name="exam-answer" path="answer" component={ExamAnswer} />
                <Route name="exam-questions" path="questions" component={ExamQuestions} />
            </Route>
        </Route>
    </Route>
)

export default GroupRoute
