import {Route, IndexRoute} from 'react-router'

const GroupRoute = (
    <Route path="groups" name="groups" component={GroupContainer}>
        <IndexRoute component={ListGroup} />

        <Route name="group-detail" path=":groupId" copmonent={GroupDetailContainer}>
            <IndexRoute component={GroupPost} />
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
