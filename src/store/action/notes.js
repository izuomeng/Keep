import * as Types from '../actionTypes/notes'
import {FILL_NOTES} from '../actionTypes/notes'
import {ADD_USER} from '../actionTypes/user'
import axios from 'axios'

export const fillNotes = (notes = []) => ({
    type: Types.FILL_NOTES,
    notes
})
export const requestNotes = (url) => {
    return {
        promise: axios.get(url).then((response) => response.data),
        types: [
            Types.REQUEST_NOTES_START,
            Types.REQUEST_NOTES_SUCCESS,
            Types.REQUEST_NOTES_FAIL,
            FILL_NOTES,
            ADD_USER
        ]
    }
}