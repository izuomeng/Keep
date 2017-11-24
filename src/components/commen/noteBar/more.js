import React from 'react'
import styled from 'styled-components'

const Item = styled.li`
  padding: 20px
`
const Container = ({className, show = false}) => (
  <div className={className}>
    <Item>删除</Item>
    <Item>others</Item>
  </div>
)
const StyledContainer = styled(Container)`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  width: 140px;
  background: white;
  z-index: 19999;
  &:hover ~div {
      visibility: hidden;
  }
`
export default StyledContainer