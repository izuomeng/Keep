import React, {Component} from 'react'
import {Cards, TextButton} from '@/components'
import {connect} from 'react-redux'
import styled from 'styled-components'
import COLOR from '@/static/javascript/color'
import {removeNote} from '@/store/action/notes'
import MessageBox from '@/lib/messageBox'
import {CLEAR_TRASH_CONFIRM} from '@/static/javascript/constants'

const Title = styled.div `
  text-align: center;
  padding: 10px 0 30px 0;
  color: ${COLOR.SIDEBAR_TEXT}
`
const Clear = TextButton.extend `
  color: #4081f5;
  width: auto;
  padding: 0 20px;
  margin: 0 20px;
`
class Trash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncRender: false
    }
  }
  componentDidMount() {
    setTimeout(() => this.setState({asyncRender: true}), 200)
  }
  onClear() {
    const {notes, removeNote} = this.props,
      ids = notes.map(note => note.id),
      option = {
        confirmText: '清空回收站'
      }
    MessageBox.confirm(CLEAR_TRASH_CONFIRM, option).then(() => {
      removeNote(ids)
    }).catch(() => null)
  }
  render() {
    const {notes} = this.props
    return (
      <div>
        {notes.length > 0
          ? <Title>
              回收站中的记事会在7天后删除
              <Clear value='立即清空回收站' onClick={::this.onClear}/>
            </Title>
          : <Title>回收站</Title>}
        {this.state.asyncRender && <Cards notes={notes}/>}
      </div>
    )
  }
}

const mapState = (state) => ({
  notes: state
    .notes
    .filter((v) => v.deleteTime)
})
const mapDispatch = {
  removeNote
}

export default connect(mapState, mapDispatch)(Trash)