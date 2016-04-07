import axios from 'axios'
import { BASE_URL } from '../config'

var AuthService = {
    login: function(email, password) {
        return axios.get('https://api.myjson.com/bins/1oo9s', {email, password});
    },

    isLoggedIn: function() {
        return !!this.getToken();
    },

    logout: function() {
        localStorage.removeItem('bearer');
    },

    getToken: function() {
        return localStorage.getItem('bearer') || null
    }
}

export default AuthService
