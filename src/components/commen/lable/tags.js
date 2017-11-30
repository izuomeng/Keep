import React from 'react'
import styled from 'styled-components'

const Container  = styled.div`
  user-select: none;
  cursor: pointer;
  display: inline-block;
  padding: 4px 6px;
  margin: 15px 10px;
  background: rgba(0, 0, 0, 0.08);
  position: relative;
  border-radius: 2px;
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
  font-size: 12px;
  font-weight: 100;
  position: absolute;
  right: 8px;
  top: 4px;
  visibility: hidden;
  &:hover {
    color: black;
    font-weight: 500;
  }
`
const Label = styled.div`
  font-size: 11px;
  margin: 0;
  border-radius: 2px;
`

export default ({children, handleClick = () => {}}) => (
  <Container>
    <Label>
      {children}
      <Delete id='delete' onClick={handleClick}>X</Delete>
    </Label>
  </Container>
)