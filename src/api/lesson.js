import { ajax } from './index'

const LessonService = groupId => {
    const url = `groups/${groupId}/lessons`
    return {
        fetchAll: function() {
            return ajax().get(url)
        },
        fetch: function(lessonId) {
            return ajax().get(url + `/${lessonId}`)
        },
        create: function(lesson) {
            return ajax().post(url, lesson)
        },
        delete: function(lessonId) {
            return ajax().delete(url + `/${lessonId}`)
        }
    }
}

export default LessonService
