import axios from 'axios'
import AuthService from '../api/auth'

export var BASE_URL = 'http://localhost:8000/api/';

export var http = axios.create({
    baseURL: BASE_URL,
    headers: {'Authorization': 'Token ' + AuthService.getToken()}
});
