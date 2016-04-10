import { http } from '../config'

const GroupService = {
    fetchAll: function() {
        return http.get('groups')
    }
}

export default GroupService
