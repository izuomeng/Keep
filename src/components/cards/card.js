import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import styled from 'styled-components'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Editor from '../editor'
import Delta from 'quill-delta'
import {connect} from 'react-redux'
import {editNote, postEditNote, deleteNoteInDB, removeNote} from '@/store/action/notes'
import {setEditMode} from '@/store/action/app'
import event from '@/lib/events'
import {regular} from '@/lib/calc'
import {uploadFile} from '@/lib/utils'
import {fireNotification} from '@/lib/notification'
import Menus from '../commen/noteBar'
import FixIcon from '../commen/icons/fix'
// import SelectIcon from '../commen/icons/select'
import Tag from '../commen/lable/tags'
import shouldUpdate from '@/lib/shouldUpdate'
import MessageBox from '@/lib/messageBox'
import {DELETE_NOTE_CONFIRM, BASE_IMG_PATH} from '@/static/javascript/constants'
import {Wrapper as TextWrapper} from '../newNote/text'
import {Wrapper as TitleWrapper} from '../newNote/title'
import {TextButton} from '../commen/button'
import Progress from './progress'

const Wrapper = styled.div `
  opacity: ${props => props.isEditable
  ? '0'
  : '1'};
  cursor: default;
  user-select: none;
  transition: max-height .2s;
  position: relative;
  width: ${props => props.isList
    ? ''
    : '240px'};
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
  & .ql-editor > * {
    cursor: ${props => props.inEditable && !props.inTrash
      ? 'text'
      : 'default'};
  }
`
const MenuContainer = styled.div `
  padding: 0 10px;
  transition: .3s;
  opacity: ${props => (props.isMoreShow || props.inEditable)
  ? 1
  : 0};
  height: 40px;
  position: relative;
  z-index: 999;
  box-shadow: ${props => props.bottomShadow ? '0 -4px 4px rgba(0,0,0,0.2)' : ''}
`
const Title = TitleWrapper.extend `
  & .ql-editor {
    padding: 5px 15px 20px 15px;
  }
  & .ql-editor::before {
    left: 15px;
  }
  max-height: ${props => props.inEditable ? '10vh' : ''};
  overflow: auto;
  transition: .3s;
  box-shadow: ${props => props.topShadow ? '0 4px 4px rgba(0,0,0,0.2)' : ''}
`
const Text = TextWrapper.extend `
  & .ql-editor {
    padding: 5px 15px 20px 15px;
  }
  & .ql-editor::before {
    left: 15px;
  }
  max-height: ${props => props.inEditable ? '70vh' : ''};
  overflow: auto;
`
const CompleteButton = TextButton.extend `
  float: right;
  font-weight: bold;
  margin-top: 10px;
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
    const {note} = this.props
    this.state = {
      bgColor: note.bgColor || '#FAFAFA',
      asyncRender: false,
      isMoreShow: false,
      tags: note.lable,
      isEditable: false,
      topShadow: false,
      bottomShadow: false,
      uploadTotol: 0,
      uploadLoaded: 0
    }
    this.tids = {}
    const {textOnChange, titleOnChange} = this.props
    if (textOnChange && titleOnChange) {
      this.titleOnChange = titleOnChange.bind(this)
      this.textOnChange = textOnChange.bind(this)
    } else {
      this.titleOnChange = () => null
      this.textOnChange = () => null
    }
    this.dispatchNewNote = this
      .dispatchNewNote
      .bind(this)
    this.onColorClick = this
      .onColorClick
      .bind(this)
    this.onArchiveClick = this
      .onArchiveClick
      .bind(this)
    this.onMoreClick = this
      .onMoreClick
      .bind(this)
    this.renderMenu = this
      .renderMenu
      .bind(this)
    this.onCardClick = this
      .onCardClick
      .bind(this)
    this.onFixClick = this
      .onFixClick
      .bind(this)
    this.onReminderClick = this
      .onReminderClick
      .bind(this)
    this.onDeleteThoroughly = this
      .onDeleteThoroughly
      .bind(this)
    this.onRestore = this
      .onRestore
      .bind(this)
    this.getInstence = this
      .getInstence
      .bind(this)
    this.textScroll = this
      .textScroll
      .bind(this)
    this.uploadImg = this
      .uploadImg
      .bind(this)
    const onFinishTimePicking = this
      .onFinishTimePicking
      .bind(this)
    const handleDelete = this
      .onDelete
      .bind(this)
    const handleAddTags = this
      .onAddTag
      .bind(this)
    this.moreClickHandlers = {
      handleDelete,
      handleAddTags
    }
    this.reminderHandlers = {
      onFinishTimePicking
    }
    //防止出现update a unmounted component
    this.willUnmount = false
    this.hideMore = () => {
      if (this.willUnmount) {
        return
      }
      this.setState({isMoreShow: false})
    }
  }
  componentWillReceiveProps(nextprops) {
    const {note} = nextprops
    this.setState({
      bgColor: note.bgColor || '#FAFAFA',
      tags: note.lable
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    const should = shouldUpdate.bind(this)
    return should(nextProps, nextState)
  }
  componentDidMount() {
    if (this.props.inEditable) {
      const pos = this
        .textInstence
        .getLength() - 1
      this
        .textInstence
        .setSelection(pos, 0)
    } else if (this.props.selectInfo) {
      this.selectText()
    }
  }
  componentDidUpdate() {
    if (this.props.selectInfo) {
      this.selectText()
    }
  }
  selectText() {
    const {selectInfo} = this.props
    if (selectInfo.titleFrom > -1) {
      this.titleInstence.formatText(
        selectInfo.titleFrom,
        selectInfo.length,
        {'background': 'darkgrey'}
      )
    }
    if (selectInfo.textFrom > -1) {
      this.textInstence.formatText(
        selectInfo.textFrom,
        selectInfo.length,
        {'background': 'darkgrey'}
      )
    }
  }
  dispatchNewNote(newNote, hasImg) {
    clearTimeout(this.tids[newNote.id])
    this.tids[newNote.id] = setTimeout(() => {
      this
        .props
        .editNote(newNote)
      const delta = new Delta(JSON.parse(JSON.stringify(newNote.text)))
      delta.forEach(op => {
        if (op.insert && op.insert.image) {
          const type = op.insert.image.match(/;base64,/)
          if (type) {
            const name = op.attributes.alt
            op.insert.image = `${BASE_IMG_PATH}/${name}`
          }
        }
      })
      const newerNote = {...newNote, text: delta}
      this
        .props
        .postEditNote(newerNote)
    }, 200)
  }
  setNewNoteHeight(newNote) {
    return new Promise((resolve) => {
      const note = {
        title: newNote.title,
        text: newNote.text,
        lable: newNote.lable,
        reminderInfo: newNote.reminderInfo
      }
      event.emitEvent('computeCardHeight', note, resolve)
    })
  }
  onColorClick(color) {
    if (color === this.state.bgColor) {
      return
    }
    const {note} = this.props
    const newNote = {
      ...note,
      bgColor: color
    }
    this.setState({bgColor: color})
    this.dispatchNewNote(newNote)
  }
  onArchiveClick() {
    const {note} = this.props
    if (note.deleteTime) {
      return
    }
    const newNote = {
      ...note,
      isArchived: !note.isArchived
    }
    this.dispatchNewNote(newNote)
  }
  onMoreClick(pos) {
    event.emitEvent('moreClick', pos, this.hideMore, this.moreClickHandlers)
    this.setState({isMoreShow: true})
  }
  onReminderClick(pos) {
    event.emitEvent('setReminder', pos, this.reminderHandlers)
  }
  onFinishTimePicking(time, repeat) {
    let title = this
        .titleInstence
        .getText()
    if (title.length < 2) {
      title = this
        .textInstence
        .getText()
    }
    const notiID = fireNotification(time, title, {}), {note} = this.props,
      newNote = {
        ...note,
        reminderInfo: {
          date: time,
          repeat,
          notiID
        }
      }
    if (!this.props.inEditable) {
      this
        .setNewNoteHeight(newNote)
        .then((height) => {
          const moreNewNote = {
            ...newNote,
            height
          }
          this.dispatchNewNote(moreNewNote)
        })
    } else {
      this.dispatchNewNote(newNote)
    }
  }
  onRemoveReminder() {
    const {note} = this.props,
      newNote = {
        ...note,
        reminderInfo: {
          date: null,
          repeat: 0
        }
      }
    clearTimeout(note.reminderInfo.notiID)
    if (!this.props.inEditable) {
      this
        .setNewNoteHeight(newNote)
        .then((height) => {
          const moreNewNote = {
            ...newNote,
            height
          }
          this.dispatchNewNote(moreNewNote)
        })
    } else {
      this.dispatchNewNote(newNote)
    }
  }
  onFixClick() {
    const {note} = this.props
    if (note.isArchived || note.deleteTime) {
      return
    }
    const newNote = {
      ...note,
      isFixed: !note.isFixed
    }
    this.dispatchNewNote(newNote)
  }
  onDelete() {
    const {note} = this.props
    if (note.deleteTime) {
      return
    }
    const deleteTime = new Date()
    const newNote = {
      ...note,
      deleteTime
    }
    this.dispatchNewNote(newNote)
  }
  onAddTag(pos) {
    const handleTagItemClick = this
      .onTagItemClick
      .bind(this)
    const tags = this.props.note.lable
    event.emitEvent('addTagShow', pos, {
      handleTagItemClick
    }, tags)
  }
  onTagItemClick(tagText) {
    const {note} = this.props,
      prevTags = this.state.tags,
      hasThisTag = prevTags.findIndex(v => v.text === tagText) > -1
        ? true
        : false
    let newTags = []
    if (hasThisTag) {
      newTags = prevTags.filter(v => v.text !== tagText)
    } else {
      newTags = [
        ...prevTags, {
          text: tagText
        }
      ]
    }
    this.setState({tags: newTags})
    const newNote = {
      ...note,
      lable: newTags
    }
    if (!this.props.inEditable) {
      this
        .setNewNoteHeight(newNote)
        .then((height) => {
          const moreNewNote = {
            ...newNote,
            height
          }
          this.dispatchNewNote(moreNewNote)
        })
    } else {
      this.dispatchNewNote(newNote)
    }
  }
  onRemoveTag(tagText) {
    return () => {
      const {note} = this.props, {tags} = this.state,
        newTags = tags.filter(v => v.text !== tagText),
        newNote = {
          ...note,
          lable: newTags
        }
      this.setState({tags: newTags})
      if (!this.props.inEditable) {
        this
          .setNewNoteHeight(newNote)
          .then((height) => {
            const moreNewNote = {
              ...newNote,
              height
            }
            this.dispatchNewNote(moreNewNote)
          })
      } else {
        this.dispatchNewNote(newNote)
      }
    }
  }
  onCardClick(e) {
    if (e.target.dataset.id === 'newNote') {
      return
    }
    const {setEditMode, note} = this.props
    const prevNote = _.cloneDeep(note)
    const pos = this
      .container
      .getBoundingClientRect()
    requestAnimationFrame(() => {
      setEditMode(true, note.id, pos, {
        showPrevCard: this
          .showPrevCard
          .bind(this, prevNote)
      }, this)
      this.setState({isEditable: true})
    })
  }
  showPrevCard(prevNote) {
    this.setState({isEditable: false})
    const {note} = this.props
    if (!_.isEqual(prevNote, note)) {
      this
        .setNewNoteHeight(note)
        .then((height) => {
          const newNote = {
            ...note,
            height
          }
          this.dispatchNewNote(newNote)
        })
    }
  }
  onDeleteThoroughly() {
    const {note, deleteNoteInDB, removeNote} = this.props
    MessageBox
      .confirm(DELETE_NOTE_CONFIRM, {confirmText: '删除'})
      .then(() => {
        setTimeout(() => {
          removeNote(note.id)
          deleteNoteInDB(note.id)
        }, 0)
      }).catch(() => null)
  }
  onRestore() {
    const {note} = this.props
    const newNote = {
      ...note,
      deleteTime: null
    }
    this.dispatchNewNote(newNote)
  }
  renderMenu() {
    if (!this.state.asyncRender) {
      this.setState({asyncRender: true})
    }
  }
  componentWillUnmount() {
    this.willUnmount = true
  }
  getRef(ref) {
    this.container = findDOMNode(ref)
  }
  getTimeStr(date) {
    const month = date.getMonth() + 1,
      day = date.getDate(),
      hour = regular(date.getHours()),
      min = regular(date.getMinutes())
    return `${month}月${day}日${hour}:${min}`
  }
  getInstence(name) {
    return ins => {
      this[name] = ins
    }
  }
  isBlank(content) {
    const delta = new Delta(content)
    return delta.length() < 2
  }
  textScroll(e) {
    const top = e.target.scrollTop,
      height = e.target.scrollHeight,
      clientHeight = e.target.clientHeight
    if (top === 0) {
      this.setState({topShadow: false})
    } else if (top >= height - clientHeight) {
      this.setState({bottomShadow: false})
    } else {
      if (this.state.topShadow && this.state.bottomShadow) {
        return
      }
      this.setState({topShadow: true, bottomShadow: true})
    }
  }
  uploadImg(file) {
    const data = {
      id: this.props.note.id,
      file
    }, self = this, {prev} = this.props
    uploadFile(data, '/notes/upload', function(e) {
      if (e.loaded / e.total === 1) {
        setTimeout(() => {
          self.setState({uploadLoaded: 0})
          if (prev) {
            prev.setState({uploadLoaded: 0})
          }
        }, 200)
      }
      self.setState({uploadLoaded: e.loaded, uploadTotol: e.total})
      if (prev) {
        prev.setState({uploadLoaded: e.loaded, uploadTotol: e.total})
      }
    })
  }
  render() {
    const {
      isMoreShow,
      bgColor,
      isEditable, 
      tags, 
      topShadow, 
      bottomShadow,
      uploadLoaded,
      uploadTotol
    } = this.state,
      {
        note,
        style,
        inEditable,
        onCardClick,
        onArchiveClick,
        onFixClick,
        onRestore,
        onDeleteThoroughly,
        onFinishEdit
      } = this.props,
      hasTitle = !this.isBlank(note.title),
      hasText = !this.isBlank(note.text),
      lable = note.isFixed
        ? '取消固定'
        : '固定记事'
    let date = note.reminderInfo.date
    if (date) {
      date = new Date(date)
    }
    return (
      <Wrapper
        id={note.id}
        bgColor={bgColor}
        isList={this.props.isList}
        onClick={onCardClick || this.onCardClick}
        isEditable={isEditable}
        inEditable={inEditable}
        inTrash={note.deleteTime}
        style={style || {}}
        ref={:: this.getRef}
        onMouseOver={!inEditable
        ? this.renderMenu
        : () => {}}>
        <Progress percent={uploadLoaded/uploadTotol}/>
        <FixIcon
          show={note.deleteTime
          ? false
          : true}
          handleClick={onFixClick
          ? () => onFixClick(this)
          : this.onFixClick}
          lable={lable}
          dataID='newNote'/> 
        {(hasTitle || inEditable) && <Title 
          topShadow={topShadow}
          inEditable={inEditable}>
          <Editor
            content={note.title}
            inEditable={inEditable}
            onChange={this.titleOnChange}
            getInstence={this.getInstence('titleInstence')}
            readOnly={!(inEditable && !note.deleteTime)}
            placeholder="标题"/>
        </Title>}
        {(hasText || inEditable) && <Text 
          inEditable={inEditable}
          onScroll={this.textScroll}>
          <Editor
            content={note.text}
            inEditable={inEditable}
            onChange={this.textOnChange}
            getInstence={this.getInstence('textInstence')}
            readOnly={!(inEditable && !note.deleteTime)}
            placeholder="添加记事..."/>
          {date && date.getMonth && <Tag
            isReminder
            dataID='newNote'
            dataLable='提醒我'
            handleDelete={:: this.onRemoveReminder}>
            {this.getTimeStr(date)}
          </Tag>}
          {tags.map(v => (
            <Tag
              key={v.text}
              dataID='newNote'
              handleDelete={this.onRemoveTag(v.text)}>
              {v.text}
            </Tag>
          ))}
        </Text>}
        <MenuContainer
          bottomShadow={bottomShadow}
          isMoreShow={isMoreShow}
          id='MenuContainer'
          inEditable={inEditable}>
          {inEditable && <CompleteButton
            value='完成'
            onClick={onFinishEdit}
            data-id='editableCardBack'/>}
          {(this.state.asyncRender || inEditable) && <Menus
            bgColor={bgColor}
            isInCard={!inEditable}
            inTrash={note.deleteTime}
            uploadImg={this.uploadImg}
            editor={this.textInstence}
            onMoreClick={this.onMoreClick}
            onColorClick={this.onColorClick}
            onReminderClick={this.onReminderClick}
            onFinishTimePicking={this.onFinishTimePicking}
            onArchiveClick={onArchiveClick
            ? () => onArchiveClick(this)
            : this.onArchiveClick}
            onDelete={onDeleteThoroughly
            ? () => onDeleteThoroughly(this)
            : this.onDeleteThoroughly}
            onRestore={onRestore
            ? () => onRestore(this)
            : this.onRestore}/>}
        </MenuContainer>
      </Wrapper>
    )
  }
}

const mapDispatch = {
  editNote,
  postEditNote,
  setEditMode,
  deleteNoteInDB,
  removeNote
}

export default connect(null, mapDispatch)(Card)
export {Text, Title}
