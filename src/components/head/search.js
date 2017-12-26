import React, {Component} from 'react'
import styled from 'styled-components'
import {browserHistory} from 'react-router'
import event from '@/lib/events'

const Input = styled
  .input
  .attrs({type: 'text', name: 'search'})`
    border-radius: 3px;
    background-color: ${props => props.bgColor};
    border: 0;
    padding-left: 70px;
    width: calc(100% - 22px);
    height: 48px;
`
const Glass = ({className}) => (
  <span className={className + ' glyphicon glyphicon-search'}></span>
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
  render() {
    const {glassColor, seachBgColor, hovColor, plhColor} = this.props, {value} = this.state
    return (
      <Container onClick={this.handleInputClick} plhColor={plhColor}>
        <Input
          value={value}
          placeholder="搜索"
          bgColor={seachBgColor}
          onChange={this.handleInput}/>
        <StyledGlass glassColor={glassColor} hovColor={hovColor}/>
      </Container>
    )
  }
}
export default SearchBar