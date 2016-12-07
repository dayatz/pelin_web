import { ajax } from './index'

const ExamService = groupId => {
    const url = `groups/${groupId}/exams`
    return {
        all: function() {
            return ajax().get(url)
        },
        get: function(id) {
            return ajax().get(`${url}/${id}`)
        },
        create: function(exam) {
            return ajax().post(url, exam)
        },
        delete: function(id) {
            return ajax().delete(`${url}/${id}`)
        },
        update: function(id, exam) {
            return ajax().update(`${url}/${id}`, exam)
        },
        scores: function(id) {
            return ajax().get(`${url}/${id}/scores`)
        },
        answer: function(id, answer) {
            return ajax().post(`${url}/${id}/answer`, answer)
        }
    }
}

export var QuestionService = (groupId, examId) => {
    const url = `groups/${groupId}/exams/${examId}/questions`
    return {
        all: function() {
            return ajax().get(url)
        },
        create: function(question) {
            return ajax().post(url, question)
        },
        delete: function(id) {
            return ajax().delete(`${url}/${id}`)
        },
        update: function(exam) {
            return ajax().patch(url, exam)
        }
    }
}

export default ExamService