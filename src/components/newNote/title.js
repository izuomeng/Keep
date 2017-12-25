import React from 'react'
import Editor from '../editor'
import styled from 'styled-components'

const Wrapper = styled.div `
  & .ql-container {
    padding: 0;
  }
  & .ql-editor {
    padding: 0 10px;
    font-size: 17px;
    font-weight: bold;
  }
  & .ql-editor::before {
    left: 10px;
  }
`

export default ({editorOnChange}) => {
  return (
    <Wrapper>
      <Editor
        onChange={editorOnChange}
        placeholder="标题"/>
    </Wrapper>
  )
}
export {Wrapper}