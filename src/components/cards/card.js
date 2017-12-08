import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Editor, convertFromRaw, EditorState } from 'draft-js'
import { connect } from 'react-redux'
import { editNote, postEditNote } from '@/store/action/notes'
import { setEditMode } from '@/store/action/app'
import event from '@/lib/events'
import Menus from '../commen/noteBar'
import FixIcon from '../commen/icons/fix'
import SelectIcon from '../commen/icons/select'
import Tag from '../commen/lable/tags'
import shouldUpdate from '@/lib/shouldUpdate'

const Wrapper = styled.div`
  opacity: ${props => props.isEditable ? '0' : '1'};
  user-select: none;
  cursor: default;
  position: relative;
  width: ${props => props.isList ? '' : '240px'};
  background: ${props => props.bgColor};
  padding: 10px 0;
  box-sizing: border-box;
  box-shadow: 0 1px 3px darkgrey,
  0 2px 2px darkgrey;
  border-radius: 2px;
  &:hover {
    box-shadow: 0 0 15px 0 darkgrey,
    0 2px 5px 0 darkgrey
  }
  &:hover #MenuContainer {
    opacity: 1;
  }
  &:hover #fixIcon {
    opacity: 1;
  }
  &:hover #selectIcon {
    opacity: 1;
  }
`
const Title = styled.div`
  font-weight: bold;  
  font-size: 17px;
  line-height: 23px;
  min-height: 38px;
  padding: 4px 15px 15px 15px;
  white-space: pre-wrap;
  word-wrap: break-word;
`
const Body = styled.div`
  font-size: 14px;
  line-height: 19px;
  min-height: 30px;
  padding: 12px 15px 15px 15px;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Roboto Slab','Times New Roman',serif;
`
const MenuContainer = styled.div`
  padding: 0 10px;
  transition: .3s;
  opacity: ${props => props.isMoreShow ? 1 : 0};
  height: 30px;
`

class Card extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired
  }
  static defaultProps = {
    isList: false
  }
  constructor(props) {
    super(props)
    const { note } = this.props
    const titleBlocksFromRaw = convertFromRaw(note.title),
      textBlocksFromRaw = convertFromRaw(note.text)
    this.state = {
      titleEditor: EditorState.createWithContent(titleBlocksFromRaw),
      textEditor: EditorState.createWithContent(textBlocksFromRaw),
      bgColor: note.bgColor || '#FAFAFA',
      asyncRender: false,
      isMoreShow: false,
      tags: note.lable,
      isEditable: false
    }
    this.tids = {}
    this.titleOnChange = (titleEditor) => this.setState({ titleEditor })
    this.textOnChange = (textEditor) => this.setState({ textEditor })
    this.dispatchNewNote = this.dispatchNewNote.bind(this)
    this.onColorClick = this.onColorClick.bind(this)
    this.onArchiveClick = this.onArchiveClick.bind(this)
    this.onMoreClick = this.onMoreClick.bind(this)
    this.shouldComponentUpdate = shouldUpdate.bind(this)
    this.onCardClick = this.onCardClick.bind(this)
    const handleDelete = this.onDelete.bind(this)
    const handleAddTags = this.onAddTag.bind(this)
    this.moreClickHandlers = {
      handleDelete,
      handleAddTags
    }
    //防止出现update a unmounted component
    this.willUnmount = false
    this.hideMore = () => {
      if (this.willUnmount) {
        return
      }
      this.setState({ isMoreShow: false })
    }
  }
  componentWillReceiveProps(nextprops) {
    if (!this.state.isEditable) {
      this.setState({tags: nextprops.note.lable})
    }
  }
  dispatchNewNote(newNote) {
    this.props.editNote(newNote)
    clearTimeout(this.tids[newNote.id])
    this.tids[newNote.id] = setTimeout(() => this.props.postEditNote(newNote), 200)
  }
  setNewNoteHeight(newNote) {
    return new Promise((resolve) => {
      clearTimeout(this.hid)
      const note = {
        title: newNote.title,
        text: newNote.text,
        lable: newNote.lable
      }
      event.emitEvent('computeCardHeight', note, resolve)
    })
  }
  onColorClick(color) {
    if (color === this.state.bgColor) {
      return
    }
    const { note } = this.props
    const newNote = { ...note, bgColor: color }
    this.setState({ bgColor: color })
    this.dispatchNewNote(newNote)
  }
  onArchiveClick() {
    const { note } = this.props
    if (note.deleteTime) {
      return
    }
    const newNote = { ...note, isArchived: !note.isArchived }
    this.dispatchNewNote(newNote)
  }
  onMoreClick(pos) {
    event.emitEvent('moreClick', pos, this.hideMore, this.moreClickHandlers)
    this.setState({ isMoreShow: true })
  }
  onFixClick() {
    const { note } = this.props
    if (note.isArchived || note.deleteTime) {
      return
    }
    const newNote = { ...note, isFixed: !note.isFixed }
    this.dispatchNewNote(newNote)
  }
  onDelete() {
    const { note } = this.props
    if (note.deleteTime) {
      return
    }
    const deleteTime = new Date()
    const newNote = { ...note, deleteTime }
    this.dispatchNewNote(newNote)
  }
  onAddTag(pos) {
    const handleTagItemClick = this.onTagItemClick.bind(this)
    const tags = this.props.note.lable
    event.emitEvent('addTagShow', pos, {handleTagItemClick}, tags)
  }
  onTagItemClick(tagText) {
    const {note} = this.props,
      prevTags = note.lable,
      hasThisTag = prevTags.findIndex(v => v.text === tagText) > -1 ? true : false
    let newTags = []
    if (hasThisTag) {
      newTags = prevTags.filter(v => v.text !== tagText)
    } else {
      newTags = [...prevTags, {text: tagText}]
    }
    this.setState({ tags: newTags })
    const newNote = {...note, lable: newTags}
    this.setNewNoteHeight(newNote).then((height) => {
      const moreNewNote = { ...newNote, height }
      this.dispatchNewNote(moreNewNote)
    })
  }
  onRemoveTag(tagText) {
    return () => {
      const { note } = this.props,
        { tags } = this.state,
        newTags = tags.filter(v => v.text !== tagText),
        newNote = { ...note, lable: newTags }
      this.setState({ tags: newTags })
      this.setNewNoteHeight(newNote).then((height) => {
        const moreNewNote = { ...newNote, height }
        this.dispatchNewNote(moreNewNote)
      })
    }
  }
  onCardClick(e) {
    if (e.target.dataset.id === 'newNote') {
      return
    }
    const {setEditMode, note} = this.props
    const pos = this.container.getBoundingClientRect()
    requestAnimationFrame(() => {
      setEditMode(true, note, pos.left, pos.top, {
        showPrevCard: () => this.setState({isEditable: false})
      }, this.container)
      this.setState({isEditable: true})
    })
  }
  renderMenu() {
    if (!this.state.asyncRender) {
      this.setState({ asyncRender: true })
    }
  }
  componentWillUnmount() {
    this.willUnmount = true
  }
  getRef(ref) {
    this.container = findDOMNode(ref)
  }
  render() {
    const { titleEditor,
            textEditor,
            isMoreShow,
            bgColor,
            isEditable,
            tags } = this.state
    const { note, style, onCardClick } = this.props
    const titleText = titleEditor.getCurrentContent().getPlainText(),
      bodyText = textEditor.getCurrentContent().getPlainText()
    const lable = note.isFixed ? '取消固定' : '固定记事'
    return (
      <Wrapper
        id={note.id}
        bgColor={bgColor}
        isList={this.props.isList}
        onClick={onCardClick || this.onCardClick}
        isEditable={isEditable}
        style={style || {}}
        ref={::this.getRef}
        onMouseOver={::this.renderMenu}
      >
        <SelectIcon
          handleClick={() => console.log('select clicked')}
          dataID='newNote'
        />
        <FixIcon
          handleClick={::this.onFixClick}
          lable={lable}
          dataID='newNote'
        />
        {titleText &&
          <Title>
            <Editor
              editorState={titleEditor}
              onChange={this.titleOnChange}
              readOnly
            />
          </Title>}
        {bodyText &&
          <Body>
            <Editor
              editorState={textEditor}
              onChange={this.textOnChange}
              readOnly
            />
          </Body>}
        {tags.map(v => (
          <Tag
            key={v.text}
            handleClick={this.onRemoveTag(v.text)}
            dataID='newNote'
          >
            {v.text}
          </Tag>
        ))}
        <MenuContainer isMoreShow={isMoreShow} id='MenuContainer'>
          {this.state.asyncRender &&
            <Menus
              isInCard
              bgColor={bgColor}
              onColorClick={this.onColorClick}
              onArchiveClick={this.onArchiveClick}
              onMoreClick={this.onMoreClick}
            />}
        </MenuContainer>
      </Wrapper>
    )
  }
}

const mapDispatch = {
  editNote,
  postEditNote,
  setEditMode
}

export default connect(null, mapDispatch)(Card)
