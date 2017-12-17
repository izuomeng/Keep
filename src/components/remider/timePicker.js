import styled from 'styled-components'
import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'

const Container = styled.div`
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  width: 100%;
  min-height: 100px;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  background: #fff;
  position: absolute;
  top: 26px;
  left: 0;
  z-index: 999;
  padding: 10px;
  cursor: default;
`
const Line = styled.div`
  height: 6px;
  border-radius:3px;
  cursor: pointer;
  background: url("line.png");
  position: relative;
  background-repeat: no-repeat;
  background-position: left center;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
`
const Drag = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  background: #fff;
  position: absolute;
  top: -7px;
`
const Title = styled.div`
  padding: 0 5px;
`
const Process = ({
  className, width, onMouseDown, onMouseMove, name, onClick
}) => (
  <div
    className={className}
    data-id='setReminder'
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
  >
    <Line
      width={width}
      data-id='setReminder'
      onClick={onClick}
      style={{backgroundSize: width+'px 10px'}}
    >
      <Drag
        left={width}
        data-name={name}
        data-id='setReminder'
        style={{left: width - 10 + 'px'}}
      />
    </Line>
  </div>
)
const StyledProcess = styled(Process)`
  padding: 15px 0;
`

class TimePicker extends Component {
  constructor(props) {
    super(props)
    const today = new Date(),
      hour = today.getHours(),
      minute = today.getMinutes(),
      hourWidth = 214 * (hour / 24) + 16,
      minuteWidth = 214 * (minute / 60) + 16
    this.state = {
      hourProcess: hourWidth,
      minuteProcess: minuteWidth
    }
    this.getRef = this.getRef.bind(this)
    this.onHourDrag = this.onHourDrag.bind(this)
    this.onMinuteDrag = this.onMinuteDrag.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.isHourMoving = false
    this.isMinuteMoving = false
    document.addEventListener('mouseup', this.onMouseUp)
  }
  getRef(ref) {
    this.processRef = findDOMNode(ref)
  }
  calc(type, width) {
    const percent = (width - 8) / (this.width - 16)
    return Math.floor(type === 'hour' ? 23 * percent : 59 * percent)
  }
  validate(width) {
    if (width <= 8) {
      return 8
    }
    if (width >= this.width - 8) {
      return this.width - 8
    }
    return width
  }
  onHourDrag(e) {
    if (e.target.dataset.name !== 'hour') {
      return
    }
    this.isHourMoving = true
  }
  onHourMove(e) {
    if (!this.isHourMoving) {
      return
    }
    let width = e.clientX - this.left
    width = this.validate(width)
    this.setState({hourProcess: width})
    clearTimeout(this.tid)
    this.tid = setTimeout(() => {
      const hour = this.calc('hour', width)
      this.props.onSelectTime('hour', hour)
    }, 50)
  }
  onMouseUp() {
    this.isHourMoving = false
    this.isMinuteMoving = false
  }
  onMinuteDrag(e) {
    if (e.target.dataset.name !== 'minute') {
      return
    }
    this.isMinuteMoving = true
  }
  onMinuteMove(e) {
    if (!this.isMinuteMoving) {
      return
    }
    let width = e.clientX - this.left
    width = this.validate(width)
    this.setState({minuteProcess: width})
    clearTimeout(this.mid)
    this.mid = setTimeout(() => {
      const minute = this.calc('minute', width)
      this.props.onSelectTime('minute', minute)
    }, 50)
  }
  onHourLineClick(e) {
    let width = e.clientX - this.left
    width = this.validate(width)
    this.setState({hourProcess: width})
    const hour = this.calc('hour', width)
    this.props.onSelectTime('hour', hour)
  }
  onMinuteLineClick(e) {
    let width = e.clientX - this.left
    width = this.validate(width)
    this.setState({minuteProcess: width})
    const minute = this.calc('minute', width)
    this.props.onSelectTime('minute', minute)
  }
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp)
  }
  render() {
    const {show} = this.props
    const {hourProcess, minuteProcess} = this.state
    if (show) {
      const pos = this.processRef.getBoundingClientRect()
      this.left = pos.left
      this.width = pos.right - pos.left
    }
    return (
      <Container show={show} data-id='setReminder'>
        <Title data-id='setReminder'>拖动滑块选择时间</Title>
        <StyledProcess
          name='hour'
          ref={this.getRef}
          width={hourProcess}
          onMouseDown={::this.onHourDrag}
          onMouseMove={::this.onHourMove}
          onClick={::this.onHourLineClick}
        />
        <StyledProcess
          name='minute'
          width={minuteProcess}
          onMouseDown={::this.onMinuteDrag}
          onMouseMove={::this.onMinuteMove}
          onClick={::this.onMinuteLineClick}
        />
      </Container>
    )
  }
}

export default TimePicker