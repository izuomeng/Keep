import styled from 'styled-components'
import React, {Component} from 'react'
import {TextButton} from '../commen/button'
import event from '@/lib/events'

const Container = styled.div`
  min-width: 300px;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  position: absolute;
  left: ${props => `${props.left}px`};
  top: ${props => `${props.top}px`};
  display: ${props => props.show ? 'block' : 'none'};
  background: #fff;
`
const Title = styled.div`
  font-size: 14px;
  padding: 15px;
  border-bottom: 1px solid rgba(0,0,0,0.2);
`
const Main = styled.div`
   padding: 15px;
   font-size: 13px;
   min-height: 20px;
`
const Save = styled.div`
  text-align: right;
  padding: 10px 15px;
`
class Reminder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.onSet= this.onSet.bind(this)
    event.addListener('setReminder', this.onSet)
  }
  onSet() {
    this.setState({show: true})
  }
  componentWillUnmount() {
    event.removeListener('setReminder', this.onSet)
  }
  render() {
    const {show} = this.state
    return (
      <Container show={show}>
        <Title>选择日期和时间</Title>
        <Main />
        <Save>
          <TextButton value='保存' />
        </Save>
      </Container>
    )
  }
}
export default Reminder