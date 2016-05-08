import { ajax } from './index'

const MessageService = {
    fetchConversation: function() {
        return ajax().get('messages')
    },
    fetchMessage: function(id) {
        return ajax().get(`messages/${id}`)
    },
    send: function(id, data) {
        return ajax().post(`messages/${id}/reply`)
    },
    remove: function(id) {
        return ajax().delete(`messages/${id}`)
    }
}

export default MessageService
