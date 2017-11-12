import * as Types from '../actionTypes/syncProgress'

export default (state = '', action) => {
    switch (action.type) {
        case Types.SYNC_PENDING:
            return 'PENDING'
        case Types.SYNC_SUCCESS:
            return 'SUCCESS'
        case Types.SYNC_FAIL:
            return 'FAIL'
        case Types.SYNC_STATIC:
            return 'STATIC'
        default:
            return state
    }
}