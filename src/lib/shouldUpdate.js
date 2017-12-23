import _ from 'lodash'

export default (nextProps, nextState) => {
  const thisProps = this.props
  const thisState = this.state
  return !_.isEqual(thisProps, nextProps) || !_.isEqual(thisState, nextState)
}