import * as Types from '../actionTypes/notes'
import axios from 'axios'

export const fillNotes = (notes = []) => ({
    type: Types.FILL_NOTES,
    notes
})
export const requestNotes = () => {
    const apiUrl = '/notes'
    return {
        promise: axios.get(apiUrl).then((response) => response.data),
        types: [
            Types.REQUEST_NOTES_START,
            Types.REQUEST_NOTES_SUCCESS,
            Types.REQUEST_NOTES_FAIL
        ]
    }
}