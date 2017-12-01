import React, { Component } from 'react'
import styled from 'styled-components'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { EditorState, convertToRaw } from 'draft-js'
import { addNote, deleteNoteInDB } from '@/store/action/notes'
import { DoNotUpdate } from '@/lib/highOrderComponents'
import shouldUpdate from '@/lib/shouldUpdate'
import event from '@/lib/events'
import COLOR from '../commen/color'
import Title from './title'
import Text from './text'
import Menus, { CompleteButton } from '../commen/noteBar'
import FixIcon from '../commen/icons/fix'
import Tag from '../commen/lable/tags'

const BeforeClick = styled.div`
  max-width: 600px;
  margin: 10px auto;
  background: ${COLOR.CARD_BACK};
  font-size: 14px;
  line-height: 19px;
  min-height: 46px;
  padding: 12px 15px 15px 15px;
  color: rgba(0,0,0,.54);
  box-shadow: 0 2px 3px darkgrey;
  border-radius: 2px;
  cursor: text;
`
const Wrapper = BeforeClick.extend`
  padding-left: 5px;
  border-radius: 2px;
  color: black;
  background: ${props => props.bgColor};
  position: relative;
`
const MenuWrapper = styled.div`

`
class NewNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleEditorState: EditorState.createEmpty(),
      textEditorState: EditorState.createEmpty(),
      bgColor: COLOR.WHITE,
      tags: []
    }
    this.note = {
      id: Math.random().toString(16).slice(2, 8),
      height: 134
    }
    this.titleOnChange = this.titleOnChange.bind(this)
    this.textOnChange = this.textOnChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleArchiveChange = this.handleArchiveChange.bind(this)
    this.getContainer = this.getContainer.bind(this)
    this.shouldComponentUpdate = shouldUpdate.bind(this)
    this.setNewNoteHeight = this.setNewNoteHeight.bind(this)
    //set upload editorContent
    const titleContent = this.state.titleEditorState.getCurrentContent()
    this.titleContentInJs = convertToRaw(titleContent)
    this.titlePlainText = titleContent.getPlainText()
    const textContent = this.state.textEditorState.getCurrentContent()
    this.textContentInJs = convertToRaw(textContent)
    this.textPlainText = textContent.getPlainText()
    this.handleMoreClick = this.handleMoreClick.bind(this)
    this.uploadNoteStatus = this.uploadNoteStatus.bind(this)
    // setup clickHandlers for more click
    const handleDelete = this.handleDelete.bind(this)
    const handleAddTags = this.handleAddTags.bind(this)
    const handleTagItemClick = this.handleTagItemClick.bind(this)
    this.moreClickHandlers = {
      handleDelete,
      handleAddTags,
      handleTagItemClick
    }
  }
  getContainer(ref) {
    this.DOMContainer = findDOMNode(ref)
  }
  uploadNoteStatus(shouldAddIntoView) {
    this.props.addNote(
      shouldAddIntoView,
      this.titleContentInJs,
      this.textContentInJs,
      this.note
    )
  }
  setNewNoteHeight(title = this.titleContentInJs, text = this.textContentInJs) {
    clearTimeout(this.hid)
    this.hid = setTimeout(() => {
      const note = {
        title,
        text,
        lable: this.state.tags
      }
      event.emitEvent('computeCardHeight', note, (height) => {
        this.note.height = height
      })
    }, 500)
  }
  titleOnChange(titleEditorState) {
    const prevContent = this.state.titleEditorState.getCurrentContent(),
      nextContent = titleEditorState.getCurrentContent(),
      nextContenInJs = convertToRaw(nextContent)
    this.setState({ titleEditorState })
    this.titleContentInJs = nextContenInJs
    this.titlePlainText = nextContent.getPlainText()
    if (nextContent.getPlainText() === prevContent.getPlainText()) {
      return
    }
    this.setNewNoteHeight(nextContenInJs)
    // 函数截流
    clearTimeout(this.tid)
    this.tid = setTimeout(() => {
      this.props.addNote(
        false,
        nextContenInJs,
        this.textContentInJs,
        this.note
      )
    }, 500)
  }
  textOnChange(textEditorState) {
    const prevContent = this.state.textEditorState.getCurrentContent(),
      nextContent = textEditorState.getCurrentContent(),
      nextContentInJs = convertToRaw(nextContent)
    this.setState({ textEditorState })
    this.textContentInJs = nextContentInJs
    this.textPlainText = nextContent.getPlainText()
    if (nextContent.getPlainText() === prevContent.getPlainText()) {
      return
    }
    this.setNewNoteHeight(this.titleContentInJs, nextContentInJs)
    clearTimeout(this.tid)
    this.tid = setTimeout(() => {
      this.props.addNote(
        false,
        this.titleContentInJs,
        nextContentInJs,
        this.note
      )
    }, 500)
  }
  isBlank() {
    return !this.titlePlainText && !this.textPlainText
  }
  componentWillUnmount() {
    requestAnimationFrame(() => {
      if (!this.isBlank()) {
        this.uploadNoteStatus(true)
      }
    })
  }
  handleColorChange(color) {
    this.setState({ bgColor: color })
    this.note.bgColor = color
    this.uploadNoteStatus(false)
  }
  handleArchiveChange() {
    if (this.isBlank()) {
      return
    }
    this.note.isArchived = true
    this.uploadNoteStatus(true)
    this.props.hideEditor()
  }
  handleMoreClick(pos) {
    event.emitEvent('moreClick', pos, null, this.moreClickHandlers)
  }
  handleDelete() {
    if (this.isBlank()) {
      return
    }
    this.titlePlainText = ''
    this.textPlainText = ''
    clearTimeout(this.dnID)
    this.dnID = setTimeout(() => this.props.deleteNote(this.note.id), 200)
  }
  handleAddTags(pos) {
    const handleTagItemClick = this.handleTagItemClick.bind(this)
    const {tags} = this.state
    event.emitEvent('addTagShow', pos, {handleTagItemClick}, tags)
  }
  handleRemoveTag(tagText) {
    return () => {
      const newTags = this.state.tags.filter(v => v.text !== tagText)
      this.setState({tags: newTags})
      this.note.lable = newTags
      setTimeout(() => {
        this.setNewNoteHeight()
        this.uploadNoteStatus(false)
      }, 100)
    }
  }
  handleTagItemClick(tagText) {
    const prevTags = this.state.tags,
      hasThisTag = prevTags.findIndex(v => v.text === tagText) > -1 ? true : false
    let newTags = []
    if (hasThisTag) {
      newTags = prevTags.filter(v => v.text !== tagText)
    } else {
      newTags = [...prevTags, {text: tagText}]
    }
    this.setState({tags: newTags})
    this.note.lable = newTags
    setTimeout(() => {
      this.setNewNoteHeight()
      this.uploadNoteStatus(false)
    }, 100)
  }
  handleFixClick() {
    if (this.isBlank()) {
      return
    }
    this.note.isFixed = true
    this.uploadNoteStatus(true)
    this.props.hideEditor()
  }
  render() {
    const {tags} = this.state
    return (
      <Wrapper
        data-id="newNote"
        bgColor={this.state.bgColor}
        ref={this.getContainer}
      >
        <FixIcon
          dataID='newNote'
          lable='固定记事'
          style={{ opacity: 1, right: '5px' }}
          handleClick={::this.handleFixClick}
        />
        <Title
          editorOnChange={this.titleOnChange}
          editorState={this.state.titleEditorState}
        />
        <Text
          editorOnChange={this.textOnChange}
          editorState={this.state.textEditorState}
        />
        {tags.map(v => (
          <Tag
            key={v.text}
            dataID='newNote'
            handleClick={this.handleRemoveTag(v.text)}
          >
            {v.text}
          </Tag>
        ))}
        <MenuWrapper data-id="newNote">
          <CompleteButton value='完成' />
          <Menus
            bgColor={this.state.bgColor}
            onColorClick={this.handleColorChange}
            onArchiveClick={this.handleArchiveChange}
            onMoreClick={this.handleMoreClick}
          />
        </MenuWrapper>
      </Wrapper>
    )
  }
}

const mapDispatch = (dispatch) => ({
  addNote(updateState, title, text, other) {
    dispatch(addNote(updateState, title, text, other))
  },
  deleteNote(id) {
    dispatch(deleteNoteInDB(id))
  }
})

const WrappedBeforeClick = DoNotUpdate(BeforeClick)
export { WrappedBeforeClick as BeforeClick }
export default connect(null, mapDispatch)(NewNote)