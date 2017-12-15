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
  padding: 0 35px 15px 15px;
  font-size: 13px;
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
      }
    }
    this.onShow= this.onShow.bind(this)
    this.onDocumentClick = this.onDocumentClick.bind(this)
    this.onPickerBackClick = this.onPickerBackClick.bind(this)
    this.onSelectDate = this.onSelectDate.bind(this)
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
    this.setState({
      isDatePickerShow: true,
      isTimePickerShow: false
    })
  }
  onTimePickerClick() {
    this.setState({
      isTimePickerShow: true,
      isDatePickerShow: false
    })
  }
  onPickerBackClick(e) {
    const data = e.target.dataset
    if (data.name === 'hide-picker') {
      this.setState({
        isTimePickerShow: false,
        isDatePickerShow: false
      })
    }
  }
  onSelectDate(newDate) {
    this.setState({
      selectDate: newDate
    })
  }
  componentWillUnmount() {
    event.removeListener('setReminder', this.onSet)
    this.props.removeDocumentClickHandler(this.onDocumentClick)
  }
  render() {
    const {
      show,
      x, y,
      isDatePickerShow,
      isTimePickerShow,
      selectDate
    } = this.state
    return (
      <Wrapper show={show} left={x} top={y}>
        <Container
          show={show}
          data-id='setReminder'
          onClick={this.onPickerBackClick}
        >
          <Title data-id='setReminder' data-name='hide-picker'>
            选择日期和时间
          </Title>
          <Main data-id='setReminder' data-name='hide-picker'>
            <Item onClick={::this.onDatePickerClick}>
              {`${selectDate.year}年${selectDate.month}月${selectDate.date}日`}
              <DatePicker
                show={isDatePickerShow}
                onSelectDate={this.onSelectDate}
              />
            </Item>
            <Item onClick={::this.onTimePickerClick}>
              下午8:00
              <TimePicker
                show={isTimePickerShow}
              />
            </Item>
            <Item>不重复</Item>
          </Main>
          <Save data-id='setReminder' data-name='hide-picker'>
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