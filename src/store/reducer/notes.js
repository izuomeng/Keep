import * as Types from '../actionTypes/notes'

export default (state = [], action) => {
    switch (action.type) {
        case Types.FILL_NOTES:
            return action.notes || action.result.notes || []
        case Types.REQUEST_NOTES_SUCCESS:
            return action.result
        case Types.REQUEST_NOTES_START:
            console.log(action.type)
            break
        case Types.REQUEST_NOTES_FAIL:
            throw new Error(action.type)
        default:
            return state
    }
}