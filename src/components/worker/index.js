import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import styled from 'styled-components'
import WorkerCard from './wokerCard'
import event from '@/lib/events'
import shouldUpdate from '@/lib/shouldUpdate'

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
      note: null
    }
    this.compute = this.compute.bind(this)
    this.bindDOM = this.bindDOM.bind(this)
    this.shouldComponentUpdate = shouldUpdate.bind(this)
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
    let height
    if (!Array.isArray(this.state.note)) {
      height = parseInt(getComputedStyle(this.cardDOM).height, 10)
      if (this.callback) {
        this.callback(height)
      }
    } else {
      height = []
      const notes = Array.from(this.cardDOM.children)
      notes.forEach((note, index) => {
        height[index] = parseInt(getComputedStyle(note).height, 10)
      })
      if (this.callback) {
        const noteAfterCalc = this.state.note.map((v, i) => {
          return {...v, height: height[i]}
        })
        this.callback(noteAfterCalc)
      }
    }
  }
  componentWillUnmount() {
    event.removeListener('computeCardHeight', this.compute)
  }
  render() {
    const {note} = this.state
    if (!Array.isArray(note)) {
      return (
        <Container ref={this.bindDOM}>
          <WorkerCard note={note} />
        </Container>
      )
    }
    else {
      return (
        <Container ref={this.bindDOM}>
          {note.map(v => (
            <WorkerCard note={v} key={v.id}/>
          ))}
        </Container>
      )
    }
  }
}

export default Worker