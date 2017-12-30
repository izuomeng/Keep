import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import Delta from 'quill-delta'
import styled from 'styled-components'
import {browserHistory} from 'react-router'
import {getPosition} from '@/lib/DOM'
import Palette from './palette'
import Icon from './icon'
import shouldUpdate from '@/lib/shouldUpdate'
import NoteBarInTrash from './inTrash'

const Wrapper = styled.div `
  display: flex;
  justify-content: space-between;
  max-width: 350px;
  padding-top: 10px;
`
class Menus extends Component {
  constructor(props) {
    // console.log(props.editor)
    super(props)
    this.onMoreClick = this
      .onMoreClick
      .bind(this)
    this.onReminderClick = this
      .onReminderClick
      .bind(this)
    this.shouldComponentUpdate = shouldUpdate.bind(this)
    this.onImageClick = this
      .onImageClick
      .bind(this)
  }
  onMoreClick() {
    const pos = getPosition(this.more, 135, 104)
    this
      .props
      .onMoreClick(pos)
  }
  onReminderClick() {
    const pos = getPosition(this.reminder, 235, 300)
    this
      .props
      .onReminderClick(pos)
  }
  onImageClick() {
    const {editor, uploadImg} = this.props
    let fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon')
    fileInput.style.display = 'none'
    fileInput.addEventListener('change', () => {
      if (fileInput.files != null && fileInput.files[0] != null) {
        // TODO: 开始上传图片的逻辑
        uploadImg(fileInput.files[0])
        const reader = new FileReader()
        reader.onload = function (e) {
          const range = editor.getSelection(true)
          editor
            .updateContents((new Delta())
            .retain(range.index)
            .delete(range.length)
            .insert({image: e.target.result}, {alt: fileInput.files[0].name}), 'user')
          editor.setSelection(range.index + 1, 'silent')
          document
            .body
            .removeChild(fileInput)
          fileInput = null
        }
        reader.readAsDataURL(fileInput.files[0])
      }
    })
    document
      .body
      .appendChild(fileInput)
    fileInput.click()
  }
  getRef(name) {
    return (ref) => this[name] = findDOMNode(ref)
  }
  render() {
    const {
        isInCard,
        bgColor,
        onColorClick,
        onArchiveClick,
        inTrash,
        onDelete,
        onRestore
      } = this.props
      const path = browserHistory
          .getCurrentLocation()
          .pathname,
        archiveLable = path.indexOf('archive') > -1
          ? '取消归档'
          : '归档'
      if (inTrash) {
        return <NoteBarInTrash onDelete={onDelete} onRestore={onRestore}/>
      }
      return (
        <Wrapper data-id='newNote'>
          <Icon
            icon="glyphicon glyphicon-bell"
            lable="提醒我"
            handleClick={this.onReminderClick}
            ref={this.getRef('reminder')}/>
          <Icon icon="glyphicon glyphicon-eye-open" lable="更改颜色">
            <Palette handleClick={onColorClick} bgColor={bgColor}/>
          </Icon>
          <Icon
            handleClick={this.onImageClick}
            icon="glyphicon glyphicon-picture"
            lable="插入图片"/>
          <Icon
            icon="glyphicon glyphicon-folder-close"
            lable={archiveLable}
            handleClick={onArchiveClick}/>
          <Icon
            icon="glyphicon glyphicon-chevron-down"
            lable="更多"
            handleClick={this.onMoreClick}
            ref={this.getRef('more')}></Icon>
          {!isInCard && <Icon icon="glyphicon glyphicon-arrow-left" lable="撤销"/>}
          {!isInCard && <Icon icon="glyphicon glyphicon-arrow-right" lable="重做"/>}
        </Wrapper>
      )
    }
  }
  export default Menus