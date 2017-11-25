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
        notes: [{}]
    }
    constructor(props) {
        super(props)
        this.state = {
            notes: this.props.notes,
            isWaterFall: this.props.isWaterFall
        }
        this.shouldComponentUpdate = shouldUpdate.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({notes: nextProps.notes})
    }
    render() {
        const {notes} = this.state
        const {isWaterFall} = this.props
        if (notes.length <= 0) {
            return null
        }
        return (
            <div>
                {isWaterFall && <WaterFall spacing={20} notes={notes} />}
                <div style={{display: isWaterFall ? 'none' : 'block'}}>
                    <List notes={notes} isWaterFall={isWaterFall} />
                </div>
            </div>
        ) 
    }
}

const mapState = (state) => ({
    isWaterFall: state.app.isWaterFall
})

export default connect(mapState, null)(Cards)