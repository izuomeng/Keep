import React from 'react'
import styled from 'styled-components'
import {browserHistory} from 'react-router'

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
function toSearch() {
  browserHistory.push('/search')
}
const Search = ({className, glassColor, seachBgColor, hovColor}) => (
  <div className={className} onClick={toSearch}>
    <Input placeholder="搜索" bgColor={seachBgColor}/>
    <StyledGlass glassColor={glassColor} hovColor={hovColor}/>
  </div>
)
const StyledSearch = styled(Search)`
  position: relative;
  display: inline-block;
  margin: 0 20px;
  color: black;
  flex: 1;
  font: normal 16px Roboto,sans-serif;
  & input:focus {
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

export default StyledSearch