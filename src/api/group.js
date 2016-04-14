import { ajax } from './index'

const GroupService = {
    fetchAll: function() {
        return ajax().get('groups')
    },

    myGroup: function() {
        return ajax().get('users/me/groups')
    }
}

export default GroupService
