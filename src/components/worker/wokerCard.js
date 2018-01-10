import React from 'react'
import styled from 'styled-components'
import Delta from 'quill-delta'
import Menus from '../commen/noteBar'
import Tag from '../commen/lable/tags'
import Editor from '../editor'
import {Text as Body, Title} from '../cards/card'

const Wrapper = styled.div `
  user-select: none;
  cursor: default;
  position: relative;
  width: 240px;
  background: white;
  padding: 10px 0;
  box-sizing: border-box;
  box-shadow: 0 1px 3px darkgrey,
  0 2px 2px darkgrey;
  transition: .2s;
  border-radius: 2px;
`
const MenuContainer = styled
  .div
  .attrs({id: 'MenuContainer'})`
  padding: 0 10px;
  transition: .3s;
  height: 40px;
`
function isBlank(content) {
  const delta = new Delta(content)
  return delta.length() < 2
}
const Card = (props) => {
  const {note} = props
  if (!note || !note.title) {
    return null
  }
  let date = note.reminderInfo && note.reminderInfo.date
  if (date) date = new Date(date)
  return (
    <Wrapper id='workerCard'>
      {!isBlank(note.title) && <Title>
        <Editor content={note.title} readOnly/>
      </Title>}
      {!isBlank(note.text) && <Body>
        <Editor content={note.text} readOnly/>
      </Body>}
      {date && <Tag>
        {`${date.getMonth()+1}月${date.getDate()}日${date.getHours()}:${date.getMinutes()}`}
      </Tag>}
      {note
        .lable
        .map(v => (
          <Tag key={v.text}>{v.text}</Tag>
        ))}
      <MenuContainer>
        <Menus isInCard/>
      </MenuContainer>
    </Wrapper>
  )
}

export default Card
