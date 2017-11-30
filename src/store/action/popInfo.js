import axios from 'axios'
import * as Types from '../actionTypes/popInfo'
import {FILL_NOTES} from '../actionTypes/notes'
import {ADD_USER} from '../actionTypes/user'
import {EDIT_LABLE} from '../actionTypes/app'

export const authenticate = (url, name, pass) => ({
    promise: axios.post(url, {
        username: name,
        userpass: pass
    }).then((response) => response.data),
    types: [
        Types.AUTH_PENDING,
        Types.AUTH_DONE,
        Types.AUTH_FAIL,
        FILL_NOTES,
        ADD_USER,
        EDIT_LABLE
    ]
})
export const clearInfo = () => ({
    type: Types.INFO_CLEAR
})
export const internetError = () => ({
    type: Types.INTERNET_ERROR,
    message: '无法连接至服务器'
})
