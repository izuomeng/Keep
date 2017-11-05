import * as Types from '../actionTypes/user'

export default (state = {}, action) => {
    switch (action.type) {
        case Types.ADD_USER:
            return {
                name: action.result.username
            }
        case Types.LOGOUT_DONE:
            return {
                name: '',
                logout: true
            }
        case Types.LOGOUT_FAIL:
            return {
                name: state.name, //登出失败还是原来的用户
                logout: false
            }
        default:
            return state
    }
}