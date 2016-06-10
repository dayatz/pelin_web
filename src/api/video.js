import { ajax } from './index'
import store from 'store'

const VideoService = {
    fetchAll: function() {
        return ajax().get('videos')
    },
    delete: function(id) {
        return ajax().delete(`videos/${id}`)
    },
    setAccessToken: function(token) {
        store.set('at', token)
    },
    getAccessToken: function() {
        return store.get('at', null)
    },
    validateToken: function() {
        return ajax().get(
            'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='
            + store.get('at'))
    },
    authUrl: function() {
        return "https://accounts.google.com/o/oauth2/auth" +
            "?client_id=1093193982584-s7pmusr1e3i87gm5183j96e7kodee19q.apps.googleusercontent.com" +
            "&redirect_uri=http://localhost:9000/videos/add/oauth" +
            "&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube" +
            "&response_type=token&pageId=none"
    }
}

export default VideoService