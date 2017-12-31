import React, {Component} from 'react'
import styled from 'styled-components'
import Delta from 'quill-delta'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {addNote, deleteNoteInDB} from '@/store/action/notes'
import {DoNotUpdate} from '@/lib/highOrderComponents'
import shouldUpdate from '@/lib/shouldUpdate'
import event from '@/lib/events'
import {regular} from '@/lib/calc'
import {fireNotification} from '@/lib/notification'
import COLOR from '../commen/color'
import {BASE_IMG_PATH} from '@/static/javascript/constants'
import {TextButton} from '../commen/button'
import Title from './title'
import Text from './text'
import Menus from '../commen/noteBar'
import FixIcon from '../commen/icons/fix'
import Tag from '../commen/lable/tags'
import {uploadFile} from '@/lib/utils'

const CompleteButton = TextButton.extend`
  float: right;
  font-weight: bold;
  margin-top: 10px;
`
const BeforeClick = styled.div `
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
const Wrapper = BeforeClick.extend `
  padding-left: 5px;
  border-radius: 2px;
  color: black;
  background: ${props => props.bgColor};
  position: relative;
`
class NewNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bgColor: COLOR.WHITE,
      tags: [],
      reminder: '',
      asyncRender: false
    }
    this.note = {
      id: Math
        .random()
        .toString(16)
        .slice(2, 8),
      height: 134
    }
    this.titleOnChange = this
      .titleOnChange
      .bind(this)
    this.textOnChange = this
      .textOnChange
      .bind(this)
    this.handleColorChange = this
      .handleColorChange
      .bind(this)
    this.handleArchiveChange = this
      .handleArchiveChange
      .bind(this)
    this.getContainer = this
      .getContainer
      .bind(this)
    this.shouldComponentUpdate = shouldUpdate.bind(this)
    this.setNewNoteHeight = this
      .setNewNoteHeight
      .bind(this)
    this.handleMoreClick = this
      .handleMoreClick
      .bind(this)
    this.uploadNoteStatus = this
      .uploadNoteStatus
      .bind(this)
    this.onReminderClick = this
      .onReminderClick
      .bind(this)
    this.uploadImg = this
      .uploadImg
      .bind(this)
    this.getInstence = this
      .getInstence
      .bind(this)
    //set upload editorContent
      this.titleContent = {}
      this.textContent = {}
      this.titlePlainText = ''
      this.textPlainText = ''
    // setup clickHandlers for more click
    const handleDelete = this
      .handleDelete
      .bind(this)
    const handleAddTags = this
      .handleAddTags
      .bind(this)
    const handleTagItemClick = this
      .handleTagItemClick
      .bind(this)
    const onFinishTimePicking = this
      .onFinishTimePicking
      .bind(this)
    this.moreClickHandlers = {
      handleDelete,
      handleAddTags,
      handleTagItemClick
    }
    this.reminderHandlers = {
      onFinishTimePicking
    }
  }
  getContainer(ref) {
    this.DOMContainer = findDOMNode(ref)
  }
  uploadNoteStatus(shouldAddIntoView) {
    if (shouldAddIntoView) {
      this
        .props
        .addNote(
          shouldAddIntoView,
          this.titleContent,
          this.textContent,
          this.note
        )
    } else {
      const delta = new Delta(JSON.parse(JSON.stringify(this.textContent)))
      delta.forEach(op => {
        if (op.insert && op.insert.image) {
          const type = op.insert.image.match(/;base64,/)
          if (type) {
            const name = op.attributes.alt
            op.insert.image = `${BASE_IMG_PATH}/${name}`
          }
        }
      })
      this
        .props
        .addNote(
          shouldAddIntoView,
          this.titleContent,
          delta,
          this.note
        )
    }
  }
  setNewNoteHeight(title = this.titleContent, text = this.textContent) {
    return new Promise((resolve) => {
      clearTimeout(this.hid)
      this.hid = setTimeout(() => {
        const note = {
          title,
          text,
          lable: this.state.tags,
          reminderInfo: this.note.reminderInfo
        }
        event.emitEvent('computeCardHeight', note, (height) => {
          this.note.height = height
          resolve()
        })
      }, 100)
    })
  }
  titleOnChange(content, text) {
    this.titleContent = content
    this.titlePlainText = text
    this
      .setNewNoteHeight(content)
      .then(() => {
        this.uploadNoteStatus(false)
      })
  }
  textOnChange(content, text) {
    this.textContent = content
    this.textPlainText = text
    this
      .setNewNoteHeight(this.titleContent, content)
      .then(() => {
        this.uploadNoteStatus(false)
      })
  }
  isBlank() {
    let blank = true
    const delta = new Delta(this.textContent)
    delta.forEach((op) => {
      if (op.insert && op.insert.image) {
        blank = false
      }
    })
    return this.titlePlainText.length < 2 && this.textPlainText.length < 2 && blank
  }
  componentWillUnmount() {
    if (!this.isBlank()) {
      const {reminderInfo} = this.note
      if (reminderInfo) {
        const time = reminderInfo.date
        let title = this.titlePlainText
        if (!title) {
          title = this.textPlainText
        }
        this.note.reminderInfo.notiID = fireNotification(time, title, {})
      }
      this
        .setNewNoteHeight()
        .then(() => requestAnimationFrame(() => {
          this.uploadNoteStatus(true)
        }))
    }
  }
  handleColorChange(color) {
    this.setState({bgColor: color})
    this.note.bgColor = color
    this.uploadNoteStatus(false)
  }
  handleArchiveChange() {
    if (this.isBlank()) {
      return
    }
    this.note.isArchived = true
    this.uploadNoteStatus(true)
    this
      .props
      .hideEditor()
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
    setTimeout(() => this.props.deleteNote(this.note.id), 200)
  }
  handleAddTags(pos) {
    const handleTagItemClick = this
      .handleTagItemClick
      .bind(this)
    const {tags} = this.state
    event.emitEvent('addTagShow', pos, {
      handleTagItemClick
    }, tags)
  }
  handleRemoveTag(tagText) {
    return () => {
      const newTags = this
        .state
        .tags
        .filter(v => v.text !== tagText)
      this.setState({tags: newTags})
      this.note.lable = newTags
      this
        .setNewNoteHeight()
        .then(() => this.uploadNoteStatus(false))
    }
  }
  handleTagItemClick(tagText) {
    const prevTags = this.state.tags,
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
    this.note.lable = newTags
    this
      .setNewNoteHeight()
      .then(() => this.uploadNoteStatus(false))
  }
  handleFixClick() {
    if (this.isBlank()) {
      return
    }
    this.note.isFixed = true
    this.uploadNoteStatus(true)
    this
      .props
      .hideEditor()
  }
  onReminderClick(pos) {
    event.emitEvent('setReminder', pos, this.reminderHandlers)
  }
  onFinishTimePicking(time, repeat) {
    this.note.reminderInfo = {
      date: time,
      repeat
    }
    const month = time.getMonth() + 1,
      date = time.getDate(),
      hour = time.getHours(),
      minute = time.getMinutes()
    this.setState({
      reminder: `${month}月${date}日${regular(hour)}:${regular(minute)}`
    })
    this.uploadNoteStatus(false)
  }
  onDeleteReminder() {
    this.setState({reminder: ''})
    this.note.reminderInfo = {
      date: null,
      repeat: 0
    }
    this.uploadNoteStatus()
  }
  onUndo() {

  }
  getTimeStr(date) {
    const month = date.getMonth() + 1,
      day = date.getDate(),
      hour = regular(date.getHours()),
      min = regular(date.getMinutes())
    return `${month}月${day}日${hour}:${min}`
  }
  getInstence(ins) {
    this.textInstence = ins
  }
  uploadImg(file) {
    const data = {
      id: this.note.id,
      file
    }
    uploadFile(data, '/notes/upload', function(e) {
      // this.onprogress(e), etc.
    })
  }
  componentDidMount() {
    this.setState({asyncRender: true})
  }
  render() {
    const {tags, reminder, asyncRender} = this.state
    return (
      <Wrapper
        data-id="newNote"
        bgColor={this.state.bgColor}
        ref={this.getContainer}>
        <FixIcon
          dataID='newNote'
          lable='固定记事'
          style={{
            opacity: 1,
            right: '5px'
          }}
          handleClick={:: this.handleFixClick}/>
        <Title editorOnChange={this.titleOnChange}/>
        <Text
          editorOnChange={this.textOnChange}
          getInstence={this.getInstence}/> 
        {reminder && <Tag
          isReminder
          dataID='newNote'
          handleDelete={:: this.onDeleteReminder}>
          {reminder}
        </Tag>}
        {tags.map(v => (
          <Tag
            key={v.text}
            dataID='newNote'
            handleDelete={this.handleRemoveTag(v.text)}>
            {v.text}
          </Tag>
        ))}
        {asyncRender && <div data-id="newNote">
          <CompleteButton value='完成'/>
          <Menus
            uploadImg={this.uploadImg}
            editor={this.textInstence}
            bgColor={this.state.bgColor}
            onColorClick={this.handleColorChange}
            onArchiveClick={this.handleArchiveChange}
            onMoreClick={this.handleMoreClick}
            onReminderClick={this.onReminderClick}
            onFinishTimePicking={this.onFinishTimePicking}/>
        </div>}
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
export {WrappedBeforeClick as BeforeClick}
export default connect(null, mapDispatch)(NewNote)