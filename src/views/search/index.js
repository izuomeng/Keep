import React, {Component} from 'react'
import {connect} from 'react-redux'
import Delta from 'quill-delta'
import {SearchFilter} from '@/components'
import event from '@/lib/events'
import {Cards} from '@/components'
import {memorize} from '@/lib/utils'

const filters = [
  {
    title: '类型'
  }, {
    title: '标签',
    tags: ['java', 'css']
  }, {
    title: '颜色',
    colors: ['lightskyblue', 'lightgreen']
  }
]

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasInput: false,
      results: []
    }
    this.findIndex = memorize(this.findIndex)
    this.handleSearch = this
      .handleSearch
      .bind(this)
    event.addListener('search', this.handleSearch)
  }
  findIndex(content, target) {
    const delta = new Delta(content),
      fullstr = delta.reduce((str = '', op) => str + op.insert)
    return fullstr.indexOf(target)
  }
  hasTarget(content, target) {
    return this.findIndex(content, target) > -1
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
  handleSearch(val) {
    if (!val) {
      return this.setState({hasInput: false})
    }
    const {notes} = this.props,
      results = notes.filter(note => {
        return this.hasTarget(note.title, val) || this.hasTarget(note.text, val)
      })
    this.selectInfo = this.getSelectionInfo(results, val)
    this.setState({hasInput: true, results})
  }
  render() {
    const {hasInput, results} = this.state,
      hasResult = results.length > 0
    return (
      <div>
        {!hasInput && <SearchFilter filters={filters}/>}
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