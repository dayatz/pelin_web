import { ajax } from './index'
import store from 'store'

const UserService = {
    me: function() {
        return ajax().get('users/me')
    },
    saveUser: function(user) {
        store.set('user', user)
    },
    getUserFromStore: function() {
        return store.get('user') || null
    },
    update: function(user) {
        return ajax().patch('users/me', user)
    },
    get: function(id) {
        return ajax().get(`users/${id}`)
    }
}

export default UserService
