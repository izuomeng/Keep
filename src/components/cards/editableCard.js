import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import { convertToRaw } from 'draft-js'
import {setEditMode} from '@/store/action/app'
import { editNote } from '@/store/action/notes'
import Card from './card'
import Back from '../commen/fullScreen'

const Container = Back.extend`
  display: ${props => props.isEditable ? 'block' : 'none'};
  z-index: 999;
`
const staticStyle = {
  display: 'none'
}
const readyStyle = (left, top) => ({
  position: 'fixed',
  left: `${left}px`,
  top: `${top}px`,
  transition: '.2s',
})
const editableStyle = {
  width: '600px',
  position: 'fixed',
  top: '20%',
  left: 'calc(50% - 300px)',
  transition: '.2s',
  opacity: '1'
}
const Background = styled.div`
  background-color: #e5e5e5;
  opacity: ${props => props.cardStyle === editableStyle ? '.8' : '0'};
  width: 100%;
  height: 100%;
  transition: .2s;
  cursor: default;
  & + div {
    cursor: text;
  }
`
const e = {
  target: {
    dataset: {
      id: 'editableCardBack'
    }
  }
}
class EditableCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardStyle: staticStyle
    }
    this.onBackClick = this.onBackClick.bind(this)
    this.onArchiveClick = this.onArchiveClick.bind(this)
    this.onFixClick = this.onFixClick.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isEditable) {
      const {left, top} = nextProps
      this.setState({cardStyle: readyStyle(left, top)})
      requestAnimationFrame(() => this.setState({cardStyle: editableStyle}))
    }
  }
  onBackClick(e) {
    if (e.target.dataset.id !== 'editableCardBack') {
      return
    }
    const {cardRef} = this.props,
      pos = cardRef.getBoundingClientRect()
    this.setState({cardStyle: readyStyle(pos.left, pos.top)})
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.callback.showPrevCard()
        requestAnimationFrame(() => this.props.setEditMode(false))
        resolve()
      }, 200)
    })
  }
  titleOnChange(titleEditorState) {
    this.setState({ titleEditor: titleEditorState })
    const nextContent = titleEditorState.getCurrentContent(),
      nextContenInJs = convertToRaw(nextContent)
    if (nextContent.getPlainText() === this.titleContent.getPlainText()) {
      return
    }
    this.titleInJs = nextContenInJs
    this.titleContent = nextContent
    const {note} = this.props,
      newNote = {...note, title: nextContenInJs}
    this.dispatchNewNote(newNote)
  }
  textOnChange(textEditorState) {
    this.setState({textEditor: textEditorState})
    const nextContent = textEditorState.getCurrentContent(),
      nextContenInJs = convertToRaw(nextContent)
    if (nextContent.getPlainText() === this.textContent.getPlainText()) {
      return
    }
    this.textInJs = nextContenInJs
    this.textContent = nextContent
    const {note} = this.props,
      newNote = {...note, text: nextContenInJs}
    this.dispatchNewNote(newNote)
  }
  onArchiveClick(self) {
    this.onBackClick(e).then(() => self.onArchiveClick())
  }
  onFixClick(self) {
    this.onBackClick(e).then(() => self.onFixClick())
  }
  render() {
    const {note, isEditable} = this.props
    const {cardStyle} = this.state
    return (
      <Container isEditable={isEditable}>
        <Background
          cardStyle={cardStyle}
          data-id='editableCardBack'
          onClick={this.onBackClick}
        />
        {isEditable && 
        <Card
          style={cardStyle}
          note={note}
          onCardClick={()=>{}}
          inEditable
          titleOnChange={this.titleOnChange}
          textOnChange={this.textOnChange}
          onArchiveClick={this.onArchiveClick}
          onFixClick={this.onFixClick}
        />}
      </Container>
    )
  }
}
const mapState = (state) => ({
  ...state.app.editMode
})
const mapDispatch = {
  setEditMode,
  editNote
}
export default connect(mapState, mapDispatch)(EditableCard)