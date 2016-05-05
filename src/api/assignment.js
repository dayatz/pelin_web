import { ajax } from './index'

const AssignmentService = groupId => {
    const url = `groups/${groupId}/assignments`
    return {
        fetchAll: function() {
            return ajax().get(url)
        },
        fetch: function(assignmentId) {
            return ajax().get(`${url}/${assignmentId}`)
        },
        create: function(assignment) {
            return ajax().post(url, assignment)
        },
        delete: function(assignmentId) {
            return ajax().delete(`${url}/${assignmentId}`)
        },
        update: function(assignmentId, assignment) {
            return ajax().patch(`${url}/${assignmentId}`, assignment)
        },
        submit: function(assignmentId, assignment) {
            return ajax().post(`${url}/${assignmentId}/submit`, assignment)
        },
        fetchSubmitted: function(assignmentId) {
            return ajax().get(`${url}/${assignmentId}/submitted`)
        }
    }
}

export default AssignmentService
