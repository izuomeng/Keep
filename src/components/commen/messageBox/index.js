import React, {Component} from 'react'
import styled from 'styled-components'
import { TextButton } from '../button'
import event from '@/lib/events'

const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1200;
  background: rgba(10,10,10,0.6);
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  display: ${props => props.show ? 'block' : 'none'};
`
const Confirm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 30px;
  max-width: 430px;
  background: #fff;
`
const Text = styled.div`
  margin-bottom: 20px;
`
const ButtonContainer = styled.div`
  text-align: right;
`
const DeleteButton = TextButton.extend`
  margin-left: 16px;
  color: #4081f5;
`

class MessageBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      message: ''
    }
    this.eventHandlers = {}
    this.onPop = this.onPop.bind(this)
    event.addListener('pop', this.onPop)
  }
  closeBoxAfterHandler(handler) {
    return () => {
      this.setState({show: false})
      if (handler) {
        handler()
      }
    }
  }
  onPop(message, eventHandlers) {
    this.setState({show: true, message})
    for (let item in eventHandlers) {
      eventHandlers[item] = this.closeBoxAfterHandler(eventHandlers[item])
    }
    this.eventHandlers = eventHandlers
  }
  componentWillUnmount() {
    event.removeListener('pop', this.onPop)
  }
  render() {
    return (
      <Back show={this.state.show}>
        <Confirm>
          <Text>
            {this.state.message}
          </Text>
          <ButtonContainer>
            <TextButton value='取消' onClick={this.eventHandlers.onCancel} />
            <DeleteButton value='删除' onClick={this.eventHandlers.onConfirm} />
          </ButtonContainer>
        </Confirm>
      </Back>
    )
  }
}

export default MessageBox