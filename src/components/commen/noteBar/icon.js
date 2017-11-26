import React from 'react'
import styled from 'styled-components'
import Lable from '../lable'

const Icon = ({className, icon, lable, children, handleClick = ()=>{}}) => (
  <div className={className} data-id='newNote' onClick={handleClick} data-lable={lable}>
      <span className={icon} data-id='newNote' data-lable={lable}></span>
      {children}
      <Lable value={lable} />
  </div>
)
const StyledIcon = styled(Icon)`
  display: inline-block;
  position: relative;
  color: #747474;
  cursor: pointer;
  padding: 5px 10px;
  &:hover {
      color: black;
  }
  &:hover>div {
      visibility: visible;
  }
  &:hover #palette {
      opacity: 1;
  }
`

export default StyledIcon