import axios from 'axios'
import { EDIT_LABLE } from '../actionTypes/app'
import * as Types from '../actionTypes/app'

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== EDIT_LABLE) {
    return next(action)
  }
  const { lable } = action
  dispatch({
    promise: axios.post('/app', { lables: lable }).then(res => res.data),
    types: [
      Types.SYNC_PENDING,
      Types.SYNC_SUCCESS,
      Types.SYNC_FAIL
    ]
  })
  return next(action)
}