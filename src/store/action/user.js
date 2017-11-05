import * as Types from '../actionTypes/user'
import axios from 'axios'

export const addUser = (name) => ({
    type: Types.ADD_USER,
    name
})
export const removeUser = () => ({
    promise: axios.get('/logout').then(res => res.data),
    types: [
        Types.LOGOUT_PENDING,
        Types.LOGOUT_DONE,
        Types.LOGOUT_FAIL
    ]
})