import * as Types from '../actionTypes/app'
import axios from 'axios'
import {SYNC_PENDING, SYNC_SUCCESS, SYNC_FAIL} from '../actionTypes/app'

export const toggleSidebar = () => ({
    type: Types.TOGGLE_SIDEBAR
})
export const hideSidebar = () => ({
    type: Types.HIDE_SIDEBAR
})
export const toggleLayout = () => ({
    type: Types.TOGGLE_LAYOUT
})
export const saveAppStatus = (appStatus) => ({
  promise: axios.post('/notes/editNote', {
    ...appStatus
  }).then(res => res.data),
  types: [
      SYNC_PENDING,
      SYNC_SUCCESS,
      SYNC_FAIL
  ]
})
export const editLable = (lable = []) => ({
  type: Types.EDIT_LABLE,
  lable
})
export const initLable = (lable = []) => ({
  type: Types.INIT_LABLE,
  lable
})