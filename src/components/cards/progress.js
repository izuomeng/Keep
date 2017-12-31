import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  top: 0;
`
const Progress = styled.div`
  visibility: ${props => props.percent ? 'visible' : 'hidden'};
  width: ${props =>props.percent * 100 || 0}%;
  height: 100%;
  background: lightskyblue;
  transition: width .2s linear
`
export default ({percent}) => (
  <Container>
    <Progress percent={percent}/>
  </Container>
)