import React from 'react'
import styled from 'styled-components'
import {AddProps} from '@/lib/highOrderComponents'
import Icon from './base'

const props = {
  icon: 'glyphicon glyphicon-pushpin'
}

const FixIcon = AddProps(Icon)(props)

const Container = styled.div`
  display: ${props => props.show
  ? 'block'
  : 'none'};
  position: absolute;
  right: 8px;
  top: 6px;
  opacity: 0;
  transition: .3s;
  z-index: 200;
`
export default({handleClick, style, dataID, lable}) => (
  <Container id='fixIcon' style={style}>
    <FixIcon handleClick={handleClick} dataID={dataID} lable={lable}/>
  </Container>
)
