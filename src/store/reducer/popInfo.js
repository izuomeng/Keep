import * as Types from '../actionTypes/popInfo'

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
                message: '请求失败，请检查网络'
            }
        case Types.INFO_CLEAR:
            return {
                type: '',
                message: ''
            }
        case Types.LOGOUT_FAIL:
            return {
                type: 'error',
                message: '退出失败，请检查网络'
            }
        case Types.INTERNET_ERROR:
            return {
                type: 'error',
                message: '无法连接至服务器',
                time: 1e10
            }
        default:
            return state
    }
}