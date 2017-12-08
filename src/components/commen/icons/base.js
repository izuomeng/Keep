import React from 'react'
import styled from 'styled-components'
import Lable from '../lable'

const Icon = ({className, icon, lable, dataID, children, handleClick = ()=>{}}) => (
  <div className={className} data-id={dataID} onClick={handleClick} data-lable={lable}>
      <span className={icon} data-id={dataID} data-lable={lable}></span>
      {children}
      <Lable value={lable} dataID={dataID}/>
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
`

export default StyledIcon