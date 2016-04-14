import AuthService from './auth'
import axios from 'axios'

export var BASE_URL = 'http://localhost:8000/api/';

export function ajax() {
    console.log('create new axios');
    var axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {'Authorization': 'Token ' + AuthService.getToken()}
    });

    console.log(axiosInstance);
    return axiosInstance;
}
