import AuthService from './auth'
import axios from 'axios'

export var BASE_URL = 'http://localhost:8000/api/';

export function ajax() {
    return axios.create({
        baseURL: BASE_URL,
        headers: {'Authorization': 'Token ' + AuthService.getToken()}
    });
}
