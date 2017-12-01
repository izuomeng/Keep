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
  display: ${props => props.pain ? 'block' : 'none'}
`

class Worker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: {},
      paint: false
    }
    this.compute = this.compute.bind(this)
    this.bindDOM = this.bindDOM.bind(this)
    event.addListener('computeCardHeight', this.compute)
  }
  compute(note, callback) {
    this.callback = callback
    this.setState({note, paint: true})
  }
  bindDOM(ref) {
    this.cardDOM = findDOMNode(ref)
  }
  componentDidUpdate() {
    if (this.state.paint) {
      const height = parseInt(getComputedStyle(this.cardDOM).height, 10)
      if (this.callback) {
        this.callback(height)
      }
      // setTimeout(() => this.setState({paint: false}), 100)
    }
  }
  componentWillUnmount() {
    event.removeListener('computeCardHeight', this.compute)
  }
  render() {
    const {paint, note} = this.state
    return (
      <Container pain={paint} ref={this.bindDOM}>
        <WorkerCard note={note} />
      </Container>
    )
  }
}

export default Worker