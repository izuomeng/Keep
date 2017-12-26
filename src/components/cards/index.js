import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import WaterFall from '../commen/waterfall'
import List from './list'
import shouldUpdate from '@/lib/shouldUpdate'

class Cards extends Component {
  static propTypes = {
    notes: PropTypes.array
  }
  static defaultProps = {
    notes: []
  }
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = shouldUpdate.bind(this)
  }
  render() {
    const {isWaterFall, label, notes, selectInfo} = this.props
    if (notes.length <= 0) {
      return null
    }
    return (
      <div>
        {isWaterFall && <WaterFall spacing={20} notes={notes} label={label} selectInfo={selectInfo}/>}
        {!isWaterFall && <List notes={notes} label={label} selectInfo={selectInfo}/>}
      </div>
    )
  }
}

const mapState = (state) => ({
  isWaterFall: state.app.isWaterFall
})

export default connect(mapState, null)(Cards)