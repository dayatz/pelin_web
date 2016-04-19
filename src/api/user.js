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
    }
}

export default UserService
