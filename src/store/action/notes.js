import * as Types from '../actionTypes/notes'
import {FILL_NOTES} from '../actionTypes/notes'
import {ADD_USER} from '../actionTypes/user'
import {INTERNET_ERROR} from '../actionTypes/popInfo'
import axios from 'axios'
import {SYNC_PENDING, SYNC_SUCCESS, SYNC_FAIL} from '../actionTypes/app'

export const fillNotes = (notes = []) => ({
    type: Types.FILL_NOTES,
    notes
})
export const requestNotes = (url) => ({
    promise: axios.get(url).then((response) => response.data),
    types: [
        Types.REQUEST_NOTES_START,
        Types.REQUEST_NOTES_SUCCESS,
        INTERNET_ERROR,
        FILL_NOTES,
        ADD_USER
    ]
})
export const addNote = (updateState, title, text, other) => ({
    type: Types.ADD_NOTE,
    updateState,
    title,
    text,
    ...other
})
export const editNote = (newNote) => ({
    type: Types.EDIT_NOTE,
    newNote
})
export const postEditNote = (newNote) => ({
    promise: axios.post('/notes/editNote', {
        newNote
    }).then(res => res.data),
    types: [
        SYNC_PENDING,
        SYNC_SUCCESS,
        SYNC_FAIL
    ]
})