import * as Types from '../actionTypes/notes'

export default (state = [], action) => {
    switch (action.type) {
        case Types.FILL_NOTES:
            return action.notes
    
        default:
            return state
    }
}