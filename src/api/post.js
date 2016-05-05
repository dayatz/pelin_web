import { ajax } from './index'

const PostService = groupId => {
    const url = `groups/${groupId}/posts`
    return {
        fetchAll: function() {
            return ajax().get(url)
        },

        fetch: function(postId) {
            return ajax().get(`${url}/${postId}`)
        },

        vote: function(postId) {
            return ajax().get(`${url}/${postId}/vote`)
        },

        create: function(post) {
            return ajax().post(url, post)
        },

        delete: function(postId) {
            return ajax().delete(`${url}/${postId}`)
        },

        fetchComment: function(postId) {
            return ajax().get(`${url}/${postId}/comments`)
        },

        comment: function(postId, comment) {
            return ajax().post(`${url}/${postId}/comments`, comment)
        }
    }
}

export default PostService
