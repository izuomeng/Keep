import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import styled from 'styled-components'
import {withRouter} from 'react-router'
import {browserHistory} from 'react-router'
import event from '@/lib/events'

const InputContainer = styled.div`
  max-width: 720px;
  position: relative;
`
const Input = styled
  .input
  .attrs({type: 'text', name: 'search', id: 'search-bar'})`
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
  right: 18px;
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
      value: '',
      rangeSearch: false
    }
    this.handleInput = this
      .handleInput
      .bind(this)
    this.getInputRef = this
      .getInputRef
      .bind(this)
    this.handleRangeSearch = this
      .handleRangeSearch
      .bind(this)
    event.addListener('range-search', this.handleRangeSearch)
  }
  handleRangeSearch(callback) {
    this.setState({rangeSearch: true})
    this.callback = callback
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
    if (!this.state.value && this.input.placeholder === '搜索') {
      return
    }
    this.setState({value: '', rangeSearch: false})
    this.input.focus()
    event.emitEvent('search', '')
    if (this.callback) {
      this.callback.call(null)
      this.callback = null
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== '/search') {
      this.input.placeholder = '搜索'
      this.setState({value: '', rangeSearch: false})
    }
  }
  render() {
    const {glassColor, seachBgColor, hovColor, plhColor} = this.props,
      {value, rangeSearch} = this.state
    return (
      <Container
        plhColor={plhColor}
        onClick={::this.handleInputClick}>
        <InputContainer>
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
          {(value || rangeSearch) && <Remove
            hovColor={hovColor}
            glassColor={glassColor}
            onClick={::this.onRemoveClick}
            icon='glyphicon glyphicon-remove'/>}
        </InputContainer>
      </Container>
    )
  }
}
export default withRouter(SearchBar)