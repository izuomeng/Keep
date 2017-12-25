import { BATCH_UPDATE_NOTES } from '../actionTypes/notes'
import * as Types from '../actionTypes/app'
import axios from 'axios'

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== BATCH_UPDATE_NOTES) {
    return next(action)
  }
  const { notes } = action
  dispatch({
    promise: axios.post('/notes/editNote', { notes }).then(res => res.data),
    types: [
      Types.SYNC_PENDING,
      Types.SYNC_SUCCESS,
      Types.SYNC_FAIL
    ]
  })
  return next(action)
}