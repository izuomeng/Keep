import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Editor, convertFromRaw, EditorState } from 'draft-js'
import { connect } from 'react-redux'
import { editNote, postEditNote } from '@/store/action/notes'
import event from '@/lib/events'
import Menus from '../commen/noteBar'
import FixIcon from '../commen/icons/fix'
import SelectIcon from '../commen/icons/select'
import Tag from '../commen/lable/tags'
import shouldUpdate from '@/lib/shouldUpdate'

const Wrapper = styled.div`
  user-select: none;
  cursor: default;
  position: relative;
  width: ${props => props.isList ? '' : '240px'};
  background: ${props => props.bgColor};
  padding: 10px 0;
  box-sizing: border-box;
  box-shadow: 0 1px 3px darkgrey,
  0 2px 2px darkgrey;
  transition: .2s;
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
      tags: note.lable
    }
    this.tids = {}
    this.titleOnChange = (titleEditor) => this.setState({ titleEditor })
    this.textOnChange = (textEditor) => this.setState({ textEditor })
    this.dispatchNewNote = this.dispatchNewNote.bind(this)
    this.onColorClick = this.onColorClick.bind(this)
    this.onArchiveClick = this.onArchiveClick.bind(this)
    this.onMoreClick = this.onMoreClick.bind(this)
    this.shouldComponentUpdate = shouldUpdate.bind(this)
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
      this.setState({tags: nextprops.note.lable})
  }
  dispatchNewNote(newNote) {
    this.props.editNote(newNote)
    clearTimeout(this.tids[newNote.id])
    this.tids[newNote.id] = setTimeout(() => this.props.postEditnote(newNote), 200)
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
  componentDidMount() {
    setTimeout(() => this.setState({ asyncRender: true }), 0)
  }
  componentWillUnmount() {
    this.willUnmount = true
  }
  render() {
    const { titleEditor, textEditor, isMoreShow, bgColor, tags } = this.state
    const { note } = this.props
    const titleText = titleEditor.getCurrentContent().getPlainText(),
      bodyText = textEditor.getCurrentContent().getPlainText()
    const lable = note.isFixed ? '取消固定' : '固定记事'
    return (
      <Wrapper
        bgColor={bgColor}
        isList={this.props.isList}
      >
        <SelectIcon handleClick={() => console.log('select clicked')} />
        <FixIcon handleClick={::this.onFixClick} lable={lable}/>
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
          <Tag key={v.text} handleClick={this.onRemoveTag(v.text)}>{v.text}</Tag>
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

const mapDispatch = (dispatch) => ({
  editNote(newNote) {
    dispatch(editNote(newNote))
  },
  postEditnote(newNote) {
    dispatch(postEditNote(newNote))
  }
})

export default connect(null, mapDispatch)(Card)
