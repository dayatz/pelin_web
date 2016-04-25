import { ajax } from './index'

const MemberService = groupId => {
     const url = `groups/${groupId}/members`;
     const pendingUrl = `groups/${groupId}/pendings`;
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
            return ajax().get(url + `/kick?nim=${nim}`)
        },

        fetchAllPendings: function() {
            return ajax().get(pendingUrl)
        },
        approve: function(requestId) {
            return ajax().get(`${pendingUrl}/${requestId}/approve`)
        },
        decline: function(requestId) {
            return ajax().get(`${pendingUrl}/${requestId}/decline`)
        },
        approveAll: function() {
            return ajax().get(`${pendingUrl}/approve_all`)
        }
     }
}

export default MemberService
