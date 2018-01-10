import * as Types from '../actionTypes/notes'
import COLOR from '../../static/javascript/color'

export default (state = [], action) => {
    switch (action.type) {
        case Types.FILL_NOTES:
            return action.result.notes || []
        case Types.ADD_NOTE:
            const restNotes = state.filter(v => v.id !== action.id)
            return [
                {
                    id: action.id,
                    title: action.title || {},
                    text: action.text || {},
                    lable: action.lable || [],
                    isFixed: action.isFixed || false,
                    isArchived: action.isArchived || false,
                    bgColor: action.bgColor || COLOR.WHITE,
                    reminderInfo: action.reminderInfo || {
                        date: null,
                        repeat: ''
                    },
                    deleteTime: action.deleteTime || null,
                    height: action.height || 134
                },
                ...restNotes
            ]
        case Types.EDIT_NOTE:
            return state.map(note => {
                if (note.id === action.newNote.id) {
                    return action.newNote
                }
                return note
            })
        case Types.BATCH_UPDATE_NOTES:
            return state.map(note => {
              const newNote = action.notes.find(v => v.id === note.id)
              if (newNote) {
                return newNote
              }
              return note
            })
        case Types.REMOVE_NOTE:
            if (Array.isArray(action.id)) {
              return state.filter(note => {
                return action.id.indexOf(note.id) < 0
              })
            }
            return state.filter(note => note.id !== action.id)
        default:
            return state
    }
}