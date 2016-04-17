import axios from 'axios'
import store from 'store'
import { BASE_URL } from './index'

const url = 'auth';

var AuthService = {
    login: function(email, password) {
        return axios.post(BASE_URL + url, {email, password});
    },

    isLoggedIn: function() {
        return !!this.getToken();
    },

    logout: function() {
        store.clear();
    },

    getToken: function() {
        return store.get('bearer', null)
    },

    setToken: function (token) {
        store.set('bearer', token)
    }
}

export default AuthService
