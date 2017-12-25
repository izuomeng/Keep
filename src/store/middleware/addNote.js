// when get addNote action, post the note to the server
import { ADD_NOTE } from '../actionTypes/notes'
import * as Types from '../actionTypes/app'
import axios from 'axios'

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ADD_NOTE) {
    return next(action)
  }
  const { updateState, type, ...note } = action
  if (updateState) {
    return next({
      type,
      ...note
    })
  } else {
    dispatch({
      promise: axios.post('/notes', { ...note }).then(res => res.data),
      types: [
        Types.SYNC_PENDING,
        Types.SYNC_SUCCESS,
        Types.SYNC_FAIL
      ]
    })
  }
}