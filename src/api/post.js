import { ajax } from './index'

const PostService = groupId => {
    const url = `groups/${groupId}/posts`;
    return {
        fetchAll: function() {
            return ajax().get(url)
        },

        fetch: function(postId) {
            return ajax().get(url + `/${postId}`)
        },

        create: function(post) {
            return ajax().post(url, post);
        }
    }
}

export default PostService
