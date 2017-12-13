import styled from 'styled-components'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TextButton} from '../commen/button'
import event from '@/lib/events'
import DatePicker from './datePicker'
import TimePicker from './timePicker'
import {
  addDocumentClickHandler,
  removeDocumentClickHandler
} from '@/store/action/app'

const Wrapper = styled.div`
  position: absolute;
  left: ${props => `${props.left}px`};
  top: ${props => `${props.top}px`};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  z-index: 1200;
`
const Container = styled.div`
  opacity: ${props => props.show ? '1' : '0'};
  transition: opacity .2s;
  min-width: 300px;
  min-height: 235px;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  background: #fff;
  border-radius: 2px;
  cursor: default;
`
const Title = styled.div`
  font-size: 14px;
  padding: 15px;
  border-bottom: 1px solid rgba(0,0,0,0.2);
`
const Main = styled.div`
  padding: 0 15px 15px 15px;
  font-size: 13px;
  margin-right: 20px;
`
const Save = styled.div`
  text-align: right;
  padding: 5px 15px;
`
const Triangle = styled.div`
  border: 4px solid transparent;
  width: 0;
  height: 0;
  border-top-color: grey;
  position: absolute;
  right: 10px;
  bottom: 8px;
`
const NoStyleItem = ({className, children, onClick}) => (
  <div className={className} data-id='setReminder' onClick={onClick}>
    <Triangle data-id='setReminder'/>
    {children}
  </div>
)
const Item = styled(NoStyleItem)`
  margin-top: 15px;
  line-height: 26px;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  cursor: pointer;
  position: relative;
  user-select: none;
`
class Reminder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      x: -500,
      y: -500,
      year: '',
      month: '',
      day: '',
      time: '',
      isDatePickerShow: false,
      isTimePickerShow: false
    }
    this.onShow= this.onShow.bind(this)
    this.onDocumentClick = this.onDocumentClick.bind(this)
    event.addListener('setReminder', this.onShow)
    props.addDocumentClickHandler(this.onDocumentClick)
  }
  onShow(pos) {
    this.setState({show: true, x: pos.x, y: pos.y})
  }
  onDocumentClick(e) {
    const data = e.target.dataset
    if (data.id === 'setReminder' || data.lable === '提醒我') {
      return
    }
    this.setState({
      x: -500,
      show: false, 
      isDatePickerShow: false,
      isTimePickerShow: false
    })
  }
  onDatePickerClick() {
    const show = this.state.isDatePickerShow
    this.setState({
      isDatePickerShow: !show,
      isTimePickerShow: false
    })
  }
  onTimePickerClick() {
    const show = this.state.isTimePickerShow
    this.setState({
      isTimePickerShow: !show,
      isDatePickerShow: false
    })
  }
  componentWillUnmount() {
    event.removeListener('setReminder', this.onSet)
    this.props.removeDocumentClickHandler(this.onDocumentClick)
  }
  render() {
    const {show, x, y, isDatePickerShow, isTimePickerShow} = this.state
    return (
      <Wrapper show={show} left={x} top={y}>
        <Container show={show} data-id='setReminder'>
          <Title data-id='setReminder'>选择日期和时间</Title>
          <Main data-id='setReminder'>
            <Item onClick={::this.onDatePickerClick}>
              2017年12月13日
              <DatePicker show={isDatePickerShow} />
            </Item>
            <Item onClick={::this.onTimePickerClick}>
              下午8:00
              <TimePicker show={isTimePickerShow} />
            </Item>
            <Item>不重复</Item>
          </Main>
          <Save data-id='setReminder'>
            <TextButton value='保存' disabled={true}/>
          </Save>
        </Container>
      </Wrapper>
    )
  }
}
const mapDispatch = {
  addDocumentClickHandler,
  removeDocumentClickHandler
}
export default connect(null, mapDispatch)(Reminder)