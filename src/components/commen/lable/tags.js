import React from 'react'
import styled from 'styled-components'

const Container  = styled.div`
  user-select: none;
  cursor: pointer;
  display: inline-block;
  padding: 3px 7px;
  margin: 0 0 10px 10px;
  background: rgba(0, 0, 0, 0.08);
  position: relative;
  border-radius: 2px;
  vertical-align: middle;
  &:hover > div{
    width: calc(100% - 10px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover #delete {
    visibility: visible;
  }
`
const Delete = styled.div`
  transform: scale(1.4, 1);
  font-weight: 100;
  position: absolute;
  right: 8px;
  top: 4px;
  cursor: pointer;
  visibility: hidden;
  &:hover {
    color: black;
    font-weight: 500;
  }
`
const Label = styled.div`
  font-size: 12px;
  margin: 0;
  border-radius: 2px;
  line-height: 19px;
`

export default ({children, handleClick = () => {}, dataID}) => (
  <Container data-id={dataID}>
    <Label data-id={dataID}>
      {children}
      <Delete id='delete' onClick={handleClick} data-id={dataID}>X</Delete>
    </Label>
  </Container>
)