import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Cards } from '@/components'
import COLOR from '@/static/javascript/color'

const Title = styled.div`
  text-align: center;
  padding: 10px 0 30px 0;
  color: ${COLOR.SIDEBAR_TEXT}
`
const Tags = (props) => {
  const {notes, location} = props
  const tag = location.pathname.slice(6)
  const withTagNotes = notes.filter(note => note.lable.findIndex(v => v.text === tag) > -1)
  return (
    <div>
      {withTagNotes.length < 1 && 
      <Title>该标签下暂无记事</Title>}
      <Cards notes={withTagNotes}/>
    </div>
  )
}

const mapState = (state) => ({
  notes: state.notes.filter((v) => !v.isArchived && !v.deleteTime)
})

export default withRouter(connect(mapState, null)(Tags))