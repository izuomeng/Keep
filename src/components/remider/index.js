import styled from 'styled-components'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TextButton} from '../commen/button'
import event from '@/lib/events'
import {regular} from '@/lib/calc'
import {requestPermission} from '@/lib/notification'
import DatePicker from './datePicker'
import TimePicker from './timePicker'
import {addDocumentClickHandler, removeDocumentClickHandler} from '@/store/action/app'

const Wrapper = styled.div `
  position: absolute;
  left: ${props => `${props.left}px`};
  top: ${props => `${props.top}px`};
  visibility: ${props => props.show
  ? 'visible'
  : 'hidden'};
  z-index: 1200;
`
const Container = styled.div `
  opacity: ${props => props.show
  ? '1'
  : '0'};
  transition: opacity .2s;
  min-width: 300px;
  min-height: 235px;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  background: #fff;
  border-radius: 2px;
  cursor: default;
`
const Title = styled.div `
  font-size: 14px;
  padding: 15px;
  border-bottom: 1px solid rgba(0,0,0,0.2);
`
const Main = styled.div `
  padding: 0 35px 15px 15px;
  font-size: 13px;
`
const Save = styled.div `
  text-align: right;
  padding: 5px 15px;
`
const Triangle = styled.div `
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
    <Triangle data-id='setReminder'/> {children}
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
    const today = new Date()
    this.state = {
      show: false,
      x: -500,
      y: -500,
      isDatePickerShow: false,
      isTimePickerShow: false,
      selectDate: {
        month: today.getMonth() + 1,
        date: today.getDate(),
        year: today.getFullYear()
      },
      selectTime: {
        hour: today.getHours(),
        minute: today.getMinutes()
      },
      repeat: 0,
      canISubmit: false
    }
    this.onShow = this
      .onShow
      .bind(this)
    this.onDocumentClick = this
      .onDocumentClick
      .bind(this)
    this.onPickerBackClick = this
      .onPickerBackClick
      .bind(this)
    this.onSelectDate = this
      .onSelectDate
      .bind(this)
    this.onSelectTime = this
      .onSelectTime
      .bind(this)
    event.addListener('setReminder', this.onShow)
    props.addDocumentClickHandler(this.onDocumentClick)
  }
  canISubmit() {
    const date = this.getDateObject()
    return date.getTime() > Date.now()
  }
  getDateObject() {
    const timePicked = new Date(), {selectDate, selectTime} = this.state
    timePicked.setFullYear(selectDate.year)
    timePicked.setMonth(selectDate.month - 1)
    timePicked.setDate(selectDate.date)
    timePicked.setHours(selectTime.hour)
    timePicked.setMinutes(selectTime.minute)
    timePicked.setSeconds(0)
    return timePicked
  }
  onShow(pos, handlers) {
    this.handlers = handlers
    this.setState({show: true, x: pos.x, y: pos.y})
  }
  onFinish() {
    const {repeat} = this.state,
      date = this.getDateObject()
    requestPermission(() => {
      this
        .handlers
        .onFinishTimePicking(date, repeat)
    }, () => {
      
    })
  }
  onDocumentClick(e) {
    const data = e.target.dataset
    if (data.id === 'setReminder' || data.lable === '提醒我') {
      return
    }
    this.setState({x: -500, show: false, isDatePickerShow: false, isTimePickerShow: false})
  }
  onDatePickerClick() {
    this.setState({isDatePickerShow: true, isTimePickerShow: false})
  }
  onTimePickerClick() {
    this.setState({isTimePickerShow: true, isDatePickerShow: false})
  }
  onPickerBackClick(e) {
    const data = e.target.dataset
    if (data.name === 'hide-picker') {
      this.setState({isTimePickerShow: false, isDatePickerShow: false})
    }
  }
  onSelectDate(newDate) {
    this.setState({selectDate: newDate})
  }
  onSelectTime(type, value) {
    if (type === 'hour') {
      this.setState({
        selectTime: {
          hour: value,
          minute: this.state.selectTime.minute
        }
      })
    } else if (type === 'minute') {
      this.setState({
        selectTime: {
          hour: this.state.selectTime.hour,
          minute: value
        }
      })
    }
  }
  componentWillUnmount() {
    event.removeListener('setReminder', this.onSet)
    this
      .props
      .removeDocumentClickHandler(this.onDocumentClick)
  }
  render() {
    const {
      x,
      y,
      show,
      selectDate,
      selectTime,
      isDatePickerShow,
      isTimePickerShow
    } = this.state
    return (
      <Wrapper show={show} left={x} top={y}>
        <Container show={show} data-id='setReminder' onClick={this.onPickerBackClick}>
          <Title data-id='setReminder' data-name='hide-picker'>
            选择日期和时间
          </Title>
          <Main data-id='setReminder' data-name='hide-picker'>
            <Item onClick={:: this.onDatePickerClick} data-id='setReminder'>
              {`${selectDate.year}年${selectDate.month}月${selectDate.date}日`}
              <DatePicker show={isDatePickerShow} onSelectDate={this.onSelectDate}/>
            </Item>
            <Item onClick={:: this.onTimePickerClick} data-id='setReminder'>
              {`${regular(selectTime.hour)}:${regular(selectTime.minute)}`}
              <TimePicker show={isTimePickerShow} onSelectTime={this.onSelectTime}/>
            </Item>
            <Item data-id='setReminder'>不重复</Item>
          </Main>
          <Save data-id='setReminder' data-name='hide-picker'>
            <TextButton
              data-id='setReminderEnd'
              value='保存'
              disabled={!this.canISubmit()}
              onClick={:: this.onFinish}/>
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