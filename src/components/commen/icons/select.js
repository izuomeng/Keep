import React from 'react'
import styled from 'styled-components'
import {AddProps} from '@/lib/highOrderComponents'
import Icon from './base'

const props = {
  icon: 'glyphicon glyphicon-ok',
  lable: '选择记事'
}

const SelectIcon = AddProps(Icon)(props)

const Container = styled.div`
  position: absolute;
  left: -8px;
  top: -8px;
  opacity: 0;
  transition: .3s;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 1px 1px rgba(0,0,0,.1);
  font-weight: 100;
  z-index: 500;
  & > div {
    padding-left: 7px;
  }
`
export default ({handleClick}) => (
  <Container id='selectIcon'>
    <SelectIcon handleClick={handleClick}/>
  </Container>
)
