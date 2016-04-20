import { ajax } from './index'

const MemberService = groupId => {
     const url = `groups/${groupId}/members`;
     return {
        fetchAll: function() {
            return ajax().get(url)
        },
        invite: function(nim) {
            return ajax().get(url + `/invite?nim=${nim}`)
        },
        leave: function() {
            return ajax().get(url + '/leave')
        },
        kick: function(nim) {
            return ajax().get(url + '/kick')
        },

        fetchAllPendings: function() {
            return ajax().get(url + '/pendings')
        },
        approve: function(requestId) {
            return ajax().get(url + `/pendings/${requestId}/approve`)
        },
        approveAll: function() {
            return ajax().get(url + '/pendings/approve_all')
        }
     }
}

export default MemberService
