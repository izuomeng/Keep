import styled from 'styled-components'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { clearInfo } from '@/store/action/popInfo'
import shouldUpdate from '@/lib/shouldUpdate'

const Pop = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  min-width: 200px;
  text-align: center;
  border-radius: 3px;
  background-color: rgba(0,0,0,0.7);
  padding: 10px;
  color: white;
  position: absolute;
  z-index: 999;
  top: 10px;
  left: calc(50% - 100px);
`
class PopUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      message: ''
    }
    this.shouldComponentUpdate = shouldUpdate.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    const {popInfo} = nextProps
    if (popInfo.message) {
      this.setState({
        show: true,
        message: popInfo.message
      })
      clearTimeout(this.tid)
      this.tid = setTimeout(() => {
        this.setState({ show: false })
        this.props.clearInfo()
      }, popInfo.time || 2000)
    }
  }
  render() {
    const {show, message} = this.state
    return (
      <Pop show={show}>
        {message}
      </Pop>
    )
  }
}
const mapState = (state) => ({
  popInfo: state.popInfo
})
const mapDispatch = {
  clearInfo
}
const connectPopUp = connect(mapState, mapDispatch)(PopUp)
export default Pop
export { connectPopUp as PopUp }