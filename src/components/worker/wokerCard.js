import React from 'react'
import styled from 'styled-components'
import {Editor, convertFromRaw, EditorState} from 'draft-js'
import Menus from '../commen/noteBar'
import Tag from '../commen/lable/tags'

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
const Title = styled.div `
  font-weight: bold;  
  font-size: 17px;
  line-height: 23px;
  min-height: 38px;
  padding: 4px 15px 15px 15px;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Roboto Condensed',arial,sans-serif;
`
const Body = styled.div `
  font-size: 14px;
  line-height: 19px;
  min-height: 30px;
  padding: 12px 15px 15px 15px;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Roboto Slab','Times New Roman',serif;
`
const MenuContainer = styled
  .div
  .attrs({id: 'MenuContainer'})`
  padding: 0 10px;
  transition: .3s;
  height: 30px;
`
const Card = (props) => {
  const {note} = props
  if (!note || !note.title) {
    return null
  }
  const titleBlocksFromRaw = convertFromRaw(note.title),
    textBlocksFromRaw = convertFromRaw(note.text),
    titleEditor = EditorState.createWithContent(titleBlocksFromRaw),
    textEditor = EditorState.createWithContent(textBlocksFromRaw),
    titleText = titleEditor
      .getCurrentContent()
      .getPlainText(),
    bodyText = textEditor
      .getCurrentContent()
      .getPlainText()
    let date = note.reminderInfo && note.reminderInfo.date
    if (date) date = new Date(date)
  return (
    <Wrapper>
      {titleText && <Title>
        <Editor editorState={titleEditor} readOnly/>
      </Title>}
      {bodyText && <Body>
        <Editor editorState={textEditor} readOnly/>
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
