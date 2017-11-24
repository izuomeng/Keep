import {is} from 'immutable'

export default (nextProps, nextState) => {
  const thisProps = this.props || {}
  const thisState = this.state || {}
  if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
    Object.keys(thisState).length !== Object.keys(nextState).length) {
    return true
  }
  for (const key in nextProps) {
    if (nextProps.hasOwnProperty(key) &&
      !is(thisProps[key], nextProps[key])) {
        return true
      }
  }
  for (const key in nextState) {
    if (nextState.hasOwnProperty(key) &&
      !is(thisState[key], nextState[key])) {
        return true
      }
  }
  return false
}