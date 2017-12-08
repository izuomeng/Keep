import Immutable, {is} from 'immutable'

export default (nextProps, nextState) => {
  const thisProps = Immutable.fromJS(this.props || {})
  const thisState = Immutable.fromJS(this.state || {})
  const nextP = Immutable.fromJS(nextProps)
  const nextS = Immutable.fromJS(nextState)
  return !is(thisProps, nextP) || !is(thisState, nextS)
}