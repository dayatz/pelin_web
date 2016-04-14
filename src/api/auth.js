import axios from 'axios'
import store from 'store'

var AuthService = {
    login: function(email, password) {
        return axios.post('http://localhost:8000/api/auth', {email, password});
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
