import { ajax } from './index'


const AssignmentService = groupId => {
    const url = `groups/${groupId}/assignments`;
    return {
        fetchAll: function() {
            return ajax().get(url)
        },

        fetch: function(assignmentId) {
            return ajax().get(url + `/${assignmentId}`)
        },

        create: function(assignment) {
            return ajax().post(url, assignment);
        }
    }
}

export default AssignmentService
