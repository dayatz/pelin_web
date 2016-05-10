import { ajax } from './index'

const MessageService = {
    fetchConversation: function() {
        return ajax().get('messages')
    },
    fetchMessage: function(id) {
        return ajax().get(`messages/${id}`)
    },
    send: function(id, msg) {
        return ajax().post(`messages/${id}/reply`, msg)
    },
    remove: function(id) {
        return ajax().delete(`messages/${id}`)
    }
}

export default MessageService
