import React, {Component} from 'react'
import styled from 'styled-components'
import event from '@/lib/events'

const Item = styled.li`
  padding: 20px
`
const Container = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  width: 140px;
  background: white;
  z-index: 9999;
  &:hover ~div {
      visibility: hidden;
  }
`
class More extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      x: '',
      y: ''
    }
    this.show = this.show.bind(this)
    event.addListener('moreClick', this.show)
  }
  show(pos) {
    this.setState({
      show: true,
      x: pos.left,
      y: pos.top
    })
  }
  componentWillUnmount() {
    event.removeListener('moreClick', this.show)
  }
  render() {
    return (
      <Container>
        <Item>删除</Item>
        <Item>others</Item>
      </Container>
    )
  }
}
export default More