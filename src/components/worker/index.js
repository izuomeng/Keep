import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import styled from 'styled-components'
import WorkerCard from '../cards/wokerCard'
import event from '@/lib/events'

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: -100;
  visibility: hidden;
`

class Worker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: {}
    }
    this.compute = this.compute.bind(this)
    this.bindDOM = this.bindDOM.bind(this)
    event.addListener('computeCardHeight', this.compute)
  }
  compute(note, callback) {
    this.callback = callback
    this.setState({note})
  }
  bindDOM(ref) {
    this.cardDOM = findDOMNode(ref)
  }
  componentDidUpdate() {
    const height = parseInt(getComputedStyle(this.cardDOM).height, 10)
    if (this.callback) {
      this.callback(height)
    }
  }
  componentWillUnmount() {
    event.removeListener('computeCardHeight', this.compute)
  }
  render() {
    const {note} = this.state
    return (
      <Container ref={this.bindDOM}>
        <WorkerCard note={note} />
      </Container>
    )
  }
}

export default Worker