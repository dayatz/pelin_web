import createAsyncAction from './createAsyncAction'
import AssignmentService from '../api/assignment'

export var fetchAssignmentAction = createAsyncAction("FETCH_ASSIGNMENT");
export var fetchAllAssignment = groupId => {
    return (dispatch, getState) => {
        // const assignments = getState().assignments.items[groupId];
        // if (assignments && assignments.length) {
        //     return Promise.resolve();
        // }

        dispatch({ type: fetchAssignmentAction.start });

        return AssignmentService(groupId).fetchAll()
            .then(r => {
                dispatch({
                    type: fetchAssignmentAction.success,
                    items: r.data,
                    groupId
                })
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: fetchAssignmentAction.fail,
                    error
                })
            })
    }
}

export var assignmentAddAction = (groupId, item) => {
    return {
        type: 'ASSIGNMENT_ADD',
        groupId, item
    }
}

export var fetchSubmittedAction = createAsyncAction("FETCH_SUBMIT_ASSIGNMENT")
export var fetchSubmitted = (groupId, assignmentId) => {
    return (dispatch, getState) => {
        // const assignments = getState().assignments.items[groupId];
        // if (assignments && assignments.length) {
        //     return Promise.resolve();
        // }

        dispatch({ type: fetchSubmittedAction.start });

        return AssignmentService(groupId)
            .fetchSubmitted(assignmentId)
            .then(r => {
                dispatch({
                    type: fetchSubmittedAction.success,
                    items: r.data,
                    assignmentId
                })
            })
            .catch(error => {
                dispatch({
                    type: fetchSubmittedAction.fail,
                    error
                })
            })
    }
}
