import * as Types from '../actionTypes/user'

export default (state = {}, action) => {
    switch (action.type) {
        case Types.ADD_USER:
            return {
                name: action.result.username
            }
        default:
            return state
    }
}