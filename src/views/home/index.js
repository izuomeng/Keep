import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Cards, NewNote} from '@/components'
import {
  addDocumentClickHandler,
  removeDocumentClickHandler
} from '@/store/action/app'

const CardsConntainer = styled.div `
  margin-top: 40px;
`
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isBeforeClick: true,
      asyncRender: false
    }
    this.handleClick = this
      .handleClick
      .bind(this)
    this.handleDocumentClick = this
      .handleDocumentClick
      .bind(this)
    this.hideEditor = this
      .hideEditor
      .bind(this)
  }
  handleClick() {
    if (!this.state.isBeforeClick) {
      return
    }
    this.setState({isBeforeClick: false})
  }
  isEditor(e) {
    const itself = e.target,
      parent = itself.parentNode,
      className = (parent && parent.className) || '',
      selfClass = itself.className || '',
      whiteList = ['ql-editor', 'ql-tooltip-editor', 'ql-tooltip']
    if (!parent) {
      return
    }
    if (parent.tagName === 'svg' || itself.tagName === 'svg') {
      return true
    }
    return whiteList.some(v => {
      return className.indexOf(v) > -1 || selfClass.indexOf(v) > -1
    })
  }
  handleDocumentClick(e) {
    const data = e.target.dataset,
      whiteList = ['newNote', 'addNewTag', 'setReminder', 'setReminderEnd']
    if (this.state.isBeforeClick) {
      return
    }
    if (whiteList.indexOf(data.id) > -1) {
      return
    } else if (data.text) {
      return
    } else if (this.isEditor(e)) {
      return
    }
    this.setState({isBeforeClick: true})
  }
  hideEditor() {
    this.setState({isBeforeClick: true})
  }
  componentDidMount() {
    setTimeout(() => this.setState({asyncRender: true}), 200)
    this
      .props
      .addDocumentClickHandler(this.handleDocumentClick)
  }
  componentWillUnmount() {
    this
      .props
      .removeDocumentClickHandler(this.handleDocumentClick)
  }
  render() {
    const {isBeforeClick} = this.state
      const {notes} = this.props,
        fixedNotes = notes.filter(v => v.isFixed),
        hasFixedNote = fixedNotes.length > 0
          ? true
          : false,
        label = hasFixedNote
          ? '其他'
          : '',
        otherNotes = notes.filter(v => !v.isFixed)
      return (
        <div>
          <NewNote
            isBeforeClick={isBeforeClick}
            onBeforeClick={this.handleClick}
            hideEditor={this.hideEditor}/> {this.state.asyncRender && <CardsConntainer>
            {hasFixedNote && <Cards notes={fixedNotes} label='已固定的记事'/>}
            <Cards notes={otherNotes} label={label}/>
          </CardsConntainer>}
        </div>
      )
    }
  }

  const mapState = (state) => ({
    notes: state
      .notes
      .filter((v) => !v.isArchived && !v.deleteTime)
  })
  const mapDispatch = {
    addDocumentClickHandler,
    removeDocumentClickHandler
  }
  export default connect(mapState, mapDispatch)(Home)