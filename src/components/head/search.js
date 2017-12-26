import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import styled from 'styled-components'
import {withRouter} from 'react-router'
import {browserHistory} from 'react-router'
import event from '@/lib/events'

const Input = styled
  .input
  .attrs({type: 'text', name: 'search'})`
    border-radius: 3px;
    background-color: ${props => props.bgColor};
    border: 0;
    padding-left: 70px;
    width: 100%;
    height: 48px;
    padding-right: 50px;
`
const Glass = ({className, icon, onClick}) => (
  <span className={className + ' ' + icon} onClick={onClick} ></span>
)
const StyledGlass = styled(Glass)`
  height: 19px;
  position: absolute;
  left: 25px;
  top: 0;
  bottom: 0;
  margin: auto;
  color: ${props => props.glassColor};
  cursor: pointer;
  &:hover{
    color: ${props => props.hovColor};
  }
`
const Remove = StyledGlass.extend`
  left: auto;
  right: 20px;
`
const Container = styled.div `
  position: relative;
  display: inline-block;
  margin: 0 20px;
  color: ${props => props.plhColor};
  flex: 1;
  font: normal 16px Roboto,sans-serif;
  & input:focus {
    color: black;
    background-color: white;
    box-shadow: 0 0 5px darkgrey;
  }
  & input:focus~span {
    color: #757575;
  }
  & ::-webkit-input-placeholder {
    color: ${props => props.plhColor};
  }
  & input:focus::-webkit-input-placeholder {
    color: #757575;
  }
`
class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleInput = this
      .handleInput
      .bind(this)
    this.getInputRef = this
      .getInputRef
      .bind(this)
  }
  handleInputClick() {
    requestAnimationFrame(() => browserHistory.push('/search'))
  }
  handleInput(e) {
    const value = e.target.value
    this.setState({value})
    clearTimeout(this.tid)
    this.tid = setTimeout(() => event.emitEvent('search', value), 200)
  }
  getInputRef(ref) {
    this.input = findDOMNode(ref)
  }
  onGlassClick() {
    this.input.focus()
  }
  onRemoveClick() {
    if (!this.state.value) {
      return
    }
    this.setState({value: ''})
    this.input.focus()
    event.emitEvent('search', '')
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== '/search') {
      this.setState({value: ''})
    }
  }
  render() {
    const {glassColor, seachBgColor, hovColor, plhColor} = this.props,
      {value} = this.state
    return (
      <Container
        plhColor={plhColor}
        onClick={::this.handleInputClick}>
        <Input
          value={value}
          placeholder="搜索"
          bgColor={seachBgColor}
          ref={this.getInputRef}
          onChange={this.handleInput}/>
        <StyledGlass
          hovColor={hovColor}
          glassColor={glassColor}
          onClick={::this.onGlassClick}
          icon='glyphicon glyphicon-search'/>
        {value && <Remove
          hovColor={hovColor}
          glassColor={glassColor}
          onClick={::this.onRemoveClick}
          icon='glyphicon glyphicon-remove'/>}
      </Container>
    )
  }
}
export default withRouter(SearchBar)