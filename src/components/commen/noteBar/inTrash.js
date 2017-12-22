import React from 'react'
import styled from 'styled-components'
import Icon from './icon'

const Container = styled.div`

`
const TrashNoteBar = ({onDelete, onRestore}) => (
  <Container>
    <Icon 
      icon="glyphicon glyphicon-share-alt"
      lable="还原"
      handleClick={onRestore}/>
    <Icon
      icon="glyphicon glyphicon-trash"
      lable="彻底删除"
      handleClick={onDelete}/>
  </Container>
)

export default TrashNoteBar