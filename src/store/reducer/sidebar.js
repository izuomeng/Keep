import * as Types from '../actionTypes/sidebar'

export default (state = true, action) => {
    switch (action.type) {
        case Types.TOGGLE_SIDEBAR:
            return !state
    
        default:
            return state
    }
}