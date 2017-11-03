import * as Types from '../actionTypes/auth'

export default (state = {}, action) => {
    switch (action.type) {
        case Types.AUTH_PENDING:
            return {
                type: action.type,
                message: '认证中...'
            }
        case Types.AUTH_DONE:
            return {
                type: action.result.type,
                message: action.result.message
            }
        case Types.AUTH_FAIL:
            return {
                type: action.type,
                message: '请求错误'
            }
        case Types.AUTH_CLEAR:
            return {
                type: '',
                message: ''
            }
        default:
            return state
    }
}