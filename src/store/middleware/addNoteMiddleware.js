// when get addNote action, post the note to the server
import {ADD_NOTE} from '../actionTypes/notes'
import * as Types from '../actionTypes/syncProgress'
import axios from 'axios'

export default ({dispatch}) => (next) => (action) => {
    const {type, ...note} = action
    if (type !== ADD_NOTE) {
        return next(action)
    }
    dispatch({
        promise: axios.post('/notes',{...note}).then(res => res.data),
        types: [
            Types.SYNC_PENDING,
            Types.SYNC_SUCCESS,
            Types.SYNC_FAIL
        ]
    })
    return next(action)
}