import { http } from '../config'

const GroupService = {
    fetchAll: function() {
        return http.get('groups')
    },

    myGroup: function() {
        return http.get('me/groups')
    }
}

export default GroupService
