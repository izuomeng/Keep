import React from 'react'
import NewNote, {BeforeClick} from './newNote'

const Wrapper = ({isBeforeClick, onBeforeClick, hideEditor}) => {
  if (isBeforeClick) {
    return (
      <BeforeClick
        onClick={onBeforeClick} 
        data-id="newNote"
      >
        添加记事...
      </BeforeClick>
    )
  }
  return (
    <NewNote hideEditor={hideEditor}/>
  )
}

export default Wrapper