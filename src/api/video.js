import { ajax } from './index'

const VideoService = {
    fetchAll: function() {
        return ajax().get('videos')
    },
    delete: function(id) {
        return ajax().delete(`videos/${id}`)
    }
}

export default VideoService