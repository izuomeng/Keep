import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import Delta from 'quill-delta'
import {SearchFilter} from '@/components'
import event from '@/lib/events'
import {Cards} from '@/components'
import {memorize} from '@/lib/utils'
import COLOR from '@/static/javascript/color'

const Title = styled.div `
  text-align: center;
  padding: 10px 0 30px 0;
  color: ${COLOR.SIDEBAR_TEXT}
`
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasInput: false,
      results: []
    }
    this.filters = [
      {
        title: '类型'
      }, {
        title: '标签',
        tags: this.getAllTags()
      }, {
        title: '颜色',
        colors: this.getAllColors()
      }
    ]
    this.searchRange = props.notes
    this.input = document.getElementById('search-bar')
    this.input.placeholder = '搜索'
    this.findIndex = memorize(this.findIndex)
    this.handleSearch = this
      .handleSearch
      .bind(this)
    this.handleTypeClick = this
      .handleTypeClick
      .bind(this)
    this.handleTagClick = this
      .handleTagClick
      .bind(this)
    this.handleColorClick = this
      .handleColorClick
      .bind(this)
    this.onRemoveCallback = this
      .onRemoveCallback
      .bind(this)
    event.addListener('search', this.handleSearch)
  }
  getAllTags() {
    const result = this.props.notes.reduce((prev, next) => {
      next.lable.forEach(v => prev.add(v.text))
      return prev
    }, new Set())
    return Array.from(result)
  }
  getAllColors() {
    const result = this.props.notes.reduce((prev, next) => {
      prev.add(next.bgColor)
      return prev
    }, new Set())
    return Array.from(result)
  }
  findIndex(content, target) {
    if (typeof target !== 'string') {
      return -1
    }
    const delta = new Delta(content),
      fullstr = delta.reduce((str = '', op) => str + op.insert)
    return fullstr.indexOf(target)
  }
  hasTarget(content, target) {
    return this.findIndex(content, target) > -1
  }
  onRemoveCallback() {
    this.searchRange = this.props.notes
    this.input.placeholder = '搜索'
    this.handleSearch('')
  }
  getSelectionInfo(notes, target) {
    return notes.map(note => {
      const titleFrom = this.findIndex(note.title, target),
        textFrom = this.findIndex(note.text, target)
      return {
        id: note.id,
        titleFrom,
        textFrom,
        length: target.length
      }
    })
  }
  getPlaceHolder(type) {
    return `在“${type}”中搜索`
  }
  handleSearch(val) {
    if (!val && this.input.placeholder === '搜索') {
      return this.setState({hasInput: false})
    }
    const notes = this.searchRange || this.props.notes,
      results = notes.filter(note => {
        return this.hasTarget(note.title, val) || this.hasTarget(note.text, val)
      })
    this.selectInfo = val ? this.getSelectionInfo(results, val) : null
    this.setState({hasInput: true, results})
  }
  callRange(range, text) {
    this.input.placeholder = this.getPlaceHolder(text)
    this.input.focus()
    this.searchRange = range
    this.handleSearch('')
    event.emitEvent('range-search', this.onRemoveCallback)
  }
  handleTypeClick(type) {
    const handler =  function() {
      let result = []
      const {notes} = this.props
      switch (type) {
        case '提醒':
          result = notes.filter(note => note.reminderInfo.date)
          break
        case '列表':
          result = notes.filter(note => note.lists)
          break
        case '图片':
          result = notes.filter(note => note.images)
          break
        case '绘图':
          result = notes.filter(note => note.paints)
          break
        default:
          break
      }
      this.callRange(result, type)
    }
    return handler.bind(this)
  }
  handleTagClick(tag) {
    const handler = function() {
      const {notes} = this.props
      this.callRange(notes.filter(note => {
        return note.lable.find(v => v.text === tag)
      }), tag)
    }
    return handler.bind(this)
  }
  handleColorClick(color) {
    const handler = function() {
      const {notes} = this.props
      this.callRange(notes.filter(note => note.bgColor === color), '颜色')
    }
    return handler.bind(this)
  }
  render() {
    const {hasInput, results} = this.state,
      hasResult = results.length > 0
    return (
      <div>
        {hasInput && !hasResult && <Title>找不到相符的搜索结果。</Title>}
        {!hasInput && <SearchFilter
          filters={this.filters}
          handleTagClick={this.handleTagClick}
          handleTypeClick={this.handleTypeClick}
          handleColorClick={this.handleColorClick}/>}
        {hasInput && hasResult && <Cards
          notes={results}
          selectInfo={this.selectInfo}/>}
      </div>
    )
  }
}
const mapState = (state) => ({
  notes: state
    .notes
    .filter(note => !note.deleteTime)
})
export default connect(mapState, null)(Search)