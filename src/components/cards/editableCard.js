import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {setEditMode} from '@/store/action/app'
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
`
class EditableCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardStyle: staticStyle
    }
    this.onBackClick = this.onBackClick.bind(this)
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
    setTimeout(() => {
      this.props.callback.showPrevCard()
      requestAnimationFrame(() => this.props.setEditMode(false))
    }, 200)
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
        />}
      </Container>
    )
  }
}
const mapState = (state) => ({
  ...state.app.editMode
})
const mapDispatch = {
  setEditMode
}
export default connect(mapState, mapDispatch)(EditableCard)