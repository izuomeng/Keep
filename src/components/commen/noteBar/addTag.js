import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import event from '@/lib/events'
import CheckBox from '../../commen/icons/checkBox'
import {calcTagPosition} from '@/lib/DOM'
import {addDocumentClickHandler,
        removeDocumentClickHandler} from '@/store/action/app'

const Wrapper = styled.div`
  position: absolute;
  left: ${props => props.x + 'px'};
  top: ${props => props.y + 'px'};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  z-index: 1100;
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
const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: #333;
  cursor: pointer;
  border: 1px solid transparent;
  line-height: 30px;
  font-size: 13px;
  width: 225px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background: #eee;
  }
`
const Title = styled.div`
  font-size: 14px;
  padding: 0 12px;
`
const Text = styled.span`
  user-select: none;
  display: inline-block;
  margin: 0 10px;
`
class AddTag extends Component {
  constructor(props) {
    super(props)
    const checkStatus = {}
    this.props.tags.forEach(v => checkStatus[v.text] = false)
    this.state = {
      show: false,
      x: 0,
      y: 0,
      checkStatus,
      clickHandlers: {}
    }
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.onDocumentClick = this.onDocumentClick.bind(this)
    event.addListener('addTagShow', this.show)
    event.addListener('addTagHide', this.hide)
    this.props.addDocumentClickHandler(this.onDocumentClick)
  }
  hide() {
    this.setState({show: false,x:-100})
  }
  show(pos, clickHandlers = {}, tags) {
    const {checkStatus} = this.state
    const newCheckStatus = {}
    for (let tag in checkStatus) {
      if (tags.findIndex(v => v.text === tag) > -1) {
        newCheckStatus[tag] = true
      } else {
        newCheckStatus[tag] = false
      }
    }
    calcTagPosition(this.props.tags.length, pos)
    this.setState({
      ...pos,
      show: true,
      clickHandlers,
      checkStatus: newCheckStatus
    })
  }
  onCheckBoxClick(tag) {
    return () => {
      const {checkStatus, clickHandlers} = this.state
      const tagCheckStatus = checkStatus[tag]
      const newCheckStatus = {...checkStatus, [tag]: !tagCheckStatus}
      this.setState({checkStatus: newCheckStatus})
      clickHandlers.handleTagItemClick(tag)
    }
  }
  onDocumentClick(e) {
    const data = e.target.dataset
    if (data.id === 'addNewTag') {
      return
    }
    this.setState({show: false, y: -1000})
  }
  componentWillUnmount() {
    event.removeListener('addTagShow', this.show)
    event.removeListener('addTagHide', this.hide)
    this.props.removeDocumentClickHandler(this.onDocumentClick)
  }
  render() {
    const {show, checkStatus} = this.state
    const {tags} = this.props
    return (
      <Wrapper {...this.state}>
        <Container show={show} data-id='addNewTag'>
          <Title>为记事添加标签</Title>
          {tags.map(v => (
            <Item
              key={v.text}
              data-id='addNewTag'
              onClick={::this.onCheckBoxClick(v.text)}
            >
              <CheckBox isChecked={checkStatus[v.text]} data-id='addNewTag'/>
              <Text data-id='addNewTag'>{v.text}</Text>
            </Item>
          ))}
        </Container>
      </Wrapper>
    )
  }
}

const mapState = (state) => ({
  tags: state.app.lables
})
const mapDispatch = {
  addDocumentClickHandler,
  removeDocumentClickHandler
}
export default connect(mapState, mapDispatch)(AddTag)