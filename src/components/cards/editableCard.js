import React, {Component} from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {setEditMode} from '@/store/action/app'
import Card from './card'
import Back from '../commen/fullScreen'

const Container = Back.extend `
  display: ${props => props.isEditable
  ? 'block'
  : 'none'};
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
  overflow: 'hidden',
  opacity: '0',
  color: 'transparent'
})
const editableStyle = {
  width: '600px',
  position: 'fixed',
  top: '20%',
  left: 'calc(50% - 300px)',
  transition: '.2s',
  opacity: '1'
}
const Background = styled.div `
  background-color: #e5e5e5;
  opacity: ${props => props.cardStyle === editableStyle
  ? '.8'
  : '0'};
  width: 100%;
  height: 100%;
  transition: .2s;
  cursor: default;
  & + div {
    cursor: ${props => props.isInTrash
    ? 'default'
    : 'text'};
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
    this.onBackClick = this
      .onBackClick
      .bind(this)
    this.mapHandlers = this
      .mapHandlers
      .bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isEditable) {
      const {left, top, isWaterFall} = nextProps
      this.setState({
        cardStyle: {
          ...readyStyle(left, top),
          width: isWaterFall ? '240px' : '600px'
        }
      })
      requestAnimationFrame(() => this.setState({cardStyle: editableStyle}))
    }
  }
  onBackClick(e) {
    if (e.target.dataset.id !== 'editableCardBack') {
      return
    }
    const {cardRef, isWaterFall} = this.props,
      pos = cardRef.getBoundingClientRect()
    this.setState({
      cardStyle: {
        ...readyStyle(pos.left, pos.top),
        width: isWaterFall ? '240px' : '600px'
      }
    })
    return new Promise((resolve) => {
      setTimeout(() => {
        this
          .props
          .callback
          .showPrevCard()
      }, 180)
      setTimeout(() => {
        this.props.setEditMode(false)
        resolve()
      }, 250)
    })
  }
  onChange(name) {
    return function(value) {
      const {note} = this.props
      if (_.isEqual(note[name], value)) {
        return
      }
      const newNote = {
        ...note,
        [name]: value
      }
      this.dispatchNewNote(newNote)
    }
  }
  mapHandlers(name) {
    return (self) => {
      this
        .onBackClick(e)
        .then(() => self[name]())
    }
  }
  render() {
    const {note, isEditable} = this.props
    const {cardStyle} = this.state
    return (
      <Container isEditable={isEditable}>
        <Background
          isInTrash={note && note.deleteTime}
          cardStyle={cardStyle}
          data-id='editableCardBack'
          onClick={this.onBackClick}/> 
          {isEditable && <Card
            inEditable
            note={note}
            style={cardStyle}
            onCardClick={() => {}}
            onFinishEdit={this.onBackClick}
            textOnChange={this.onChange('text')}
            titleOnChange={this.onChange('title')}
            onFixClick={this.mapHandlers('onFixClick')}
            onArchiveClick={this.mapHandlers('onArchiveClick')}
            onRestore={this.mapHandlers('onRestore')}
            onDeleteThoroughly={this.mapHandlers('onDeleteThoroughly')}/>}
      </Container>
    )
  }
}
const mapState = (state) => ({
  ...state.app.editMode,
  note: state.notes.find(note => note.id === state.app.editMode.noteID),
  isWaterFall: state.app.isWaterFall
})
const mapDispatch = {
  setEditMode
}
export default connect(mapState, mapDispatch)(EditableCard)
