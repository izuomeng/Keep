import * as Types from '../actionTypes/user'

export default (state = {}, action) => {
    switch (action.type) {
        case Types.ADD_USER:
            return {
                id: action.id,
                name: action.name
            }
        default:
            return state
    }
}