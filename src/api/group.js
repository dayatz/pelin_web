import { ajax } from './index'

const url = 'groups';
const GroupService = {
    fetchAll: function() {
        return ajax().get(url)
    },
    myGroup: function() {
        return ajax().get('users/me/groups')
    },
    fetch: function(id) {
        return ajax().get(url + `/${id}`);
    },
    create: function(group) {
        return ajax().post(url, group);
    },
    update: function(id, data) {
        return ajax().patch(url + `/${id}`, data);
    },
    leave: function(groupId) {
        return ajax().get(`groups/${groupId}/leave`)
    },
    join: function(groupId) {
        return ajax().get(`groups/${groupId}/join`)
    },
}

export default GroupService
