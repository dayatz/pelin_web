import AuthService from './auth'
import axios from 'axios'
import {BASE_URL as ROOT_URL} from '../config'

export var BASE_URL = ROOT_URL + '/api/'
// export var BASE_URL = 'pelinapi-edsproject.rhcloud.com/api/'

export function ajax() {
    return axios.create({
        baseURL: BASE_URL,
        headers: {'Authorization': 'Bearer  ' + AuthService.getToken()}
    })
}
