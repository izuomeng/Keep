import styled from 'styled-components'
import React, {Component} from 'react'
import Icon from '../commen/icons/base'
import {isLeapYear} from '@/lib/calc'

const Container = styled.div `
  display: ${props => props.show
  ? 'block'
  : 'none'};
  width: 100%;
  min-height: 200px;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  background: #fff;
  position: absolute;
  top: 26px;
  left: 0;
  z-index: 999;
  border-radius: 2px;
  font-size: 15px;
  padding-bottom: 5px;
`
const Top = styled.div `
  padding: 5px 5px 0 5px;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
`
const Arrow = styled.div `
  float: ${props => props.left
  ? 'left'
  : 'right'};
  min-width: 30px;
`
const CurrentValue = styled.div `
  font-weight: bold;
  overflow: hidden;
  text-align: center;
  border-radius: 4px;
  line-height: 30px;
  &:hover {
    background: #eeeeee;
  }
  & > span {
    vertical-align: -2px;
  }
`
const Main = styled.div `
  padding: 0 5px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  cursor: default;
`
const Week = styled.div `
  width: 34px;
  line-height: 34px;
  text-align: center;
  border-radius: 4px;
  font-weight: bold;
`
const Day = Week.extend `
  font-weight: normal;
  cursor: ${props => props.prev || props.highLight
  ? 'default'
  : 'pointer'};
  color: ${props => props.prev
    ? 'grey'
    : (props.highLight
      ? 'white'
      : 'black')};
  background: ${props => props.highLight
      ? 'linear-gradient(to bottom, #FEBA2C, #D99316)'
      : ''};
  &:hover {
    background: ${props => props.prev || props.highLight
        ? ''
        : '#eeeeee'};
  }
`
class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.HowManyDays = [
      0,
      31,
      28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ]
    const today = new Date()
    this.fullYear = today.getFullYear()
    this.month = today.getMonth() + 1
    this.date = today.getDate()
    this.day = today.getDay()
    if (isLeapYear(this.fullYear)) 
      this.HowManyDays[2] = 29
    const renderData = this.calcRenderData(this.fullYear, this.month)
    this.state = {
      month: this.month,
      date: this.date,
      year: this.fullYear,
      renderData
    }
    this.pickedDate = {
      month: this.month,
      date: this.date,
      year: this.fullYear
    }
    this.onDateClick = this
      .onDateClick
      .bind(this)
    this.isPicked = this
      .isPicked
      .bind(this)
  }
  calcRenderData(year, month) {
    if (isLeapYear(year)) 
      this.HowManyDays[2] = 29
    else 
      this.HowManyDays[2] = 28
    const cntDate = new Date()
      cntDate.setFullYear(year)
      cntDate.setMonth(month - 1)
      cntDate.setDate(1)
      let week = cntDate.getDay(),
        result = [],
        lastMonthDays,
        i
      if (month === 1) {
        lastMonthDays = 31
      } else {
        lastMonthDays = this.HowManyDays[month - 1]
      }
      for (i = week - 1; i >= 0; i--) {
        result[i] = lastMonthDays--
      }
      result.start = week
      for (i = 1; i <= this.HowManyDays[month]; i++) {
        result[week++] = i
      }
      result.stop = week
      const rest = (7 - result.length % 7) % 7
      for (i = 1; i <= rest; i++) {
        result.push(i)
      }
      return result
    }
    onDateClick(date) {
      return () => {
        this.pickedDate = {
          month: this.state.month,
          year: this.state.year,
          date
        }
        this.setState({date})
        this
          .props
          .onSelectDate(this.pickedDate)
      }
    }
    onNextClick() {
      let newMonth = this.state.month + 1,
        newYear = this.state.year
      if (newMonth === 13) {
        newYear += 1
        newMonth = 1
      }
      const newData = this.calcRenderData(newYear, newMonth)
      this.setState({
        month: newMonth,
        year: newYear,
        renderData: newData
      })
    }
    onPrevClick() {
      let newMonth = this.state.month - 1,
        newYear = this.state.year
      if (newMonth === 0) {
        newYear -= 1
        newMonth = 12
      }
      const newData = this.calcRenderData(newYear, newMonth)
      this.setState({
        month: newMonth,
        year: newYear,
        renderData: newData
      })
    }
    isPicked() {
      const {month, year} = this.pickedDate
      return month === this.state.month && 
        year === this.state.year
    }
    render() {
      const {show} = this.props,
        {renderData, month, year} = this.state,
        Weeks = [
          '日',
          '一',
          '二',
          '三',
          '四',
          '五',
          '六'
        ]
      return (
        <Container show={show}>
          <Top data-id='setReminder'>
            <Arrow left>
              <Icon
                lable='上一页'
                dataID='setReminder'
                icon='glyphicon glyphicon-arrow-left'
                handleClick={:: this.onPrevClick}/>
            </Arrow>
            <Arrow>
              <Icon
                lable='下一页'
                dataID='setReminder'
                icon='glyphicon glyphicon-arrow-right'
                handleClick={:: this.onNextClick}/>
            </Arrow>
            <CurrentValue data-id='setReminder'>
              <span data-id='setReminder'>
                {`${year}年${month}月`}
              </span>
            </CurrentValue>
            <Main
              style={{
              padding: 0,
              clear: 'both'
            }}>
              {Weeks.map(v => (
                <Week data-id='setReminder' key={v}>{v}</Week>
              ))}
            </Main>
          </Top>
          <Main data-id='setReminder'>
            {renderData.map((v, i, ary) => {
              if (v === this.pickedDate.date && 
                i >= ary.start && i < ary.stop && this.isPicked()) {
                return (
                  <Day data-id='setReminder' highLight key={'HL' + v}>
                    {v}
                  </Day>
                )
              }
              if (i < ary.start || i >= ary.stop) {
                return (
                  <Day data-id='setReminder' key={'P' + v} prev>
                    {v}
                  </Day>
                )
              }
              return (
                <Day
                  key={v}
                  data-id='setReminder'
                  data-name='hide-picker'
                  onClick={this.onDateClick(v)}>
                  {v}
                </Day>
              )
            })}
          </Main>
        </Container>
      )
    }
  }

  export default DatePicker