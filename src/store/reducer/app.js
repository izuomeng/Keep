import * as Types from '../actionTypes/app'

export default (state = {}, action) => {
    switch (action.type) {
        case Types.TOGGLE_SIDEBAR:
          return {...state, sidebar: !state.sidebar}
        case Types.HIDE_SIDEBAR:
          return {...state, sidebar: false}
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
        case Types.EDIT_LABLE:
          return {...state, lables: action.lable}
        case Types.INIT_LABLE:
          return {...state, lables: action.result.app.lables || []}
        case Types.SET_EDIT_MODE:
          const {type, ...rest} = action
          return {...state, editMode: {...rest}}
        default:
            return state
    }
}