import {browserHistory} from 'react-router'
import {SYNC_STATIC} from '../actionTypes/app'
import {AUTH_TIME_EXCEED} from '../actionTypes/popInfo'
import {REMOVE_USER} from '../actionTypes/user'

const isPromise = (obj) => obj && typeof obj.then === 'function'

export default ({ dispatch }) => (next) => (action) => {
  const { types, promise, ...rest } = action
  if (!isPromise(promise) || !(types && types.length >= 3)) {
    return next(action)
  }
  const [PENDING, DONE, FAIL, ...OTHER] = types
  dispatch({
    type: PENDING,
    ...rest
  })
  return action.promise.then((result) => {
    if (result.type === 'error' && result.message === 'not authenticate') {
      browserHistory.push('/login')
      dispatch({type: SYNC_STATIC})
      dispatch({type: AUTH_TIME_EXCEED})
      dispatch({type: REMOVE_USER})
    } else {
      dispatch({
        type: DONE,
        result,
        ...rest
      })
      OTHER.forEach(v => dispatch({
        type: v,
        result
      }))
    }
  }, (error) => {
    dispatch({
      type: FAIL,
      message: error.message
    })
  })
}