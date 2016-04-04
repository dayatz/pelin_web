import axios from 'axios'

const AuthService = {
    login: (u, p) => {
        return axios.get('https://api.myjson.com/bins/1oo9s');
    }
}

export default AuthService
