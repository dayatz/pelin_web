import axios from 'axios'

var AuthService = {
    login: function(email, password) {
        return axios.post('http://localhost:8000/api/auth', {email, password});
    },

    isLoggedIn: function() {
        return !!this.getToken();
    },

    logout: function() {
        localStorage.removeItem('bearer');
    },

    getToken: function() {
        return localStorage.getItem('bearer') || null
    },

    setToken: function (token) {
        localStorage.setItem('bearer', token)
    }
}

export default AuthService
