import React from 'react'
import styled from 'styled-components'
import Editor from '../editor'

const Wrapper = styled.div `
  & .ql-container {
    padding: 0;
  }
  & .ql-editor {
    padding: 20px 10px;
    font-size: 14px;
  }
  & .ql-editor::before {
    left: 10px;
  }
`

export default ({editorOnChange, getInstence}) => {
  return (
    <Wrapper>
      <Editor
        autofocus
        getInstence={getInstence}
        onChange={editorOnChange}
        placeholder="添加记事..."/>
    </Wrapper>
  )
}
export {Wrapper}