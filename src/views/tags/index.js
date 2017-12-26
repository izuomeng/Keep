import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Cards} from '@/components'
import COLOR from '@/static/javascript/color'

const Title = styled.div `
  text-align: center;
  padding: 10px 0 30px 0;
  color: ${COLOR.SIDEBAR_TEXT}
`
class Tags extends Component {
  constructor(props) {
    super(props)
    this.state = {
      asyncRender: false
    }
  }
  componentDidMount() {
    setTimeout(() => this.setState({asyncRender: true}), 200)
  }
  render() {
    const {notes, location} = this.props,
      tag = location.pathname.slice(6),
      withTagNotes = notes.filter(note => {
        return note.lable.findIndex(v => v.text === tag) > -1
      })
    return (
      <div>
        {withTagNotes.length < 1 && <Title>该标签下暂无记事</Title>}
        {this.state.asyncRender && <Cards notes={withTagNotes}/>}
      </div>
    )
  }
}
const mapState = (state) => ({
  notes: state
    .notes
    .filter((v) => !v.isArchived && !v.deleteTime)
})

export default withRouter(connect(mapState, null)(Tags))