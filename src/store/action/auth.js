import * as Types from '../actionTypes/auth'
import {FILL_NOTES} from '../actionTypes/notes'
import axios from 'axios'

export const authenticate = (url, name, pass) => {
    return {
        promise: axios.post(url, {
            username: name,
            userpass: pass
        }).then((response) => response.data),
        types: [
            Types.AUTH_PENDING,
            Types.AUTH_DONE,
            Types.AUTH_FAIL,
            FILL_NOTES
        ]
    }
}
