import React, {Component} from 'react'
import styled from 'styled-components'
import event from '@/lib/events'

const Item = styled.li`
  padding: 7px 10px 3px 17px;
  color: #333;
  cursor: pointer;
  border: 1px solid transparent;
  &:hover {
    background: #eee;
  }
`
const Wrapper = styled.div`
  position: absolute;
  left: ${props => props.x + 'px'};
  top: ${props => props.y + 'px'};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  z-index: 999;
`
const Container = styled.ul`
  font-size: 13px;
  background: #fff;
  padding: 6px 0;
  transition: .2s;
  opacity: ${props => props.show ? 1 : 0};
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  border-radius: 2px;
`
class More extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      x: 0,
      y: 0,
      callback: null,
      clickHandlers: {}
    }
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.onDocumentClick = this.onDocumentClick.bind(this)
    event.addListener('moreClick', this.show)
    event.addListener('moreHide', this.hide)
    document.addEventListener('click', this.onDocumentClick)
  }
  hide() {
    this.setState({show: false,x:-100})
  }
  show(pos, callback, clickHandlers) {
    if (this.state.callback) {
      this.state.callback()
    }
    this.setState({
      show: true,
      x: pos.left,
      y: pos.top,
      callback,
      clickHandlers
    })
  }
  onDocumentClick(e) {
    const data = e.target.dataset
    if (!this.state.show) {
      return
    }
    if (data.lable === '更多') {
        return
    }
    if (this.state.callback) {
      this.state.callback()
    }
    this.hide()
  }
  componentWillUnmount() {
    event.removeListener('moreClick', this.show)
    event.removeListener('moreHide', this.hide)
    document.removeEventListener('click', this.onDocumentClick)
  }
  render() {
    const {clickHandlers} = this.state
    return (
      <Wrapper {...this.state}>
        <Container data-id='newNote' show={this.state.show}>
          <Item data-id='moreItem' onClick={clickHandlers.handleDelete}>删除这条记事</Item>
          <Item data-id='newNote'>添加标签</Item>
          <Item data-id='newNote'>添加绘图</Item>
          <Item data-id='newNote'>复制</Item>
        </Container>
      </Wrapper>
    )
  }
}
export default More