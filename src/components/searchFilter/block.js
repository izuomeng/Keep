import React from 'react'
import styled from 'styled-components'

// type, tag, color
const candidateColor = {
  background: ['#4285f4', '#f5f5f5', 'transparent'],
  text: ['#fff', '#717171', 'transparent']
}
function getColor(what) {
  const cddt = candidateColor[what]
  return (props) => {
    switch (props.type) {
      case 'type':
        return cddt[0]
      case 'tag':
        return cddt[1]
      default:
        return cddt[2]
    }
  }
}
const Container = styled.div `
  background: ${getColor('background')};
  color: ${getColor('text')};
  cursor: pointer;
  font-size: 24px;
  line-height: 157px;
  text-align: center;
  position: relative;
  width: 157px;
  display: inline-block;
  margin-top: 4px;
  margin-left: ${props => props.first ? '0' : '4px'};
`
const Text = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  line-height: normal;
  font-size: 14px;
  padding: 0 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const CircleContainer = styled.div`
  width: 80px;
  height: 80px;
  display: inline-block;
  cursor: pointer;
`
const Circle = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.08);
  background: ${props => props.background};
  &:hover {
    border: 1px solid grey;
  }
`
export default({type, options, first, onClick}) => {
  if (type === 'circle') {
    return (
      <CircleContainer>
        <Circle background={options.background} onClick={onClick}/>
      </CircleContainer>
    )
  }
  return (
    <Container type={type} first={first} onClick={onClick}>
      <span className={options.icon}></span>
      <Text>{options.text}</Text>
    </Container>
  )
}
