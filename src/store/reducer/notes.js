import * as Types from '../actionTypes/notes'
import COLOR from '../../static/javascript/color'

export default (state = [], action) => {
    switch (action.type) {
        case Types.FILL_NOTES:
            return action.result.notes
        case Types.ADD_NOTE:
            return [
                {
                    id: action.id,
                    title: action.title || {},
                    text: action.text || {},
                    lable: action.lable || '',
                    isFixed: action.isFixed || false,
                    bgColor: action.bgColor || COLOR.WHITE,
                    reminderInfo: action.reminderInfo || {
                        date: null,
                        repeat: ''
                    },
                    deleteTime: action.deleteTime || null
                },
                ...state
            ]
        default:
            return state
    }
}