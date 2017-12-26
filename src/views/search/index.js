import React, {Component} from 'react'
// import {connect} from 'react-redux'
import {SearchFilter} from '@/components'

const filters = [
  {
    title: '类型'
  },
  {
    title: '标签',
    tags: ['java', 'css'],
  },
  {
    title: '颜色',
    colors: ['lightskyblue', 'lightgreen']
  }
]

class Search extends Component {
  render() {
    return (
      <SearchFilter filters={filters}/>
    )
  }
}

export default Search