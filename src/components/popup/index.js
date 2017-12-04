import styled from 'styled-components'
import React, { Component } from 'react'
import store from '@/store'
import { clearInfo } from '@/store/action/popInfo'

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
    this.unsubscribe = store.subscribe(() => {
      const popInfo = store.getState()['popInfo']
      if (popInfo.message) {
        this.setState({
          show: true,
          message: popInfo.message
        })
        clearTimeout(this.tid)
        this.tid = setTimeout(() => {
          this.setState({ show: false })
          store.dispatch(clearInfo())
        }, popInfo.time || 2000)
      }
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    return (
      <Pop show={this.state.show}>
        {this.state.message}
      </Pop>
    )
  }
}
export default Pop
export { PopUp }