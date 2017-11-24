import * as Types from '../actionTypes/app'

export default (state = {}, action) => {
    switch (action.type) {
        case Types.TOGGLE_SIDEBAR:
            return {...state, sidebar: !state.sidebar}
        case Types.SYNC_PENDING:
            return {...state, syncProgress: 'PENDING'}
        case Types.SYNC_SUCCESS:
            return {...state, syncProgress: 'SUCCESS'}
        case Types.SYNC_FAIL:
            return {...state, syncProgress: 'FAIL'}
        case Types.SYNC_STATIC:
            return {...state, syncProgress: 'STATIC'}
        case Types.TOGGLE_LAYOUT:
            return {...state, isWaterFall: !state.isWaterFall}
        default:
            return state
    }
}