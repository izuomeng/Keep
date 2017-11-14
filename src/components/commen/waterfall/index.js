import React, {Component} from 'react'
import PropTypes from 'prop-types'

class WaterFall extends Component {
    static propTypes = {
        container: PropTypes.element,
        waterDrops: PropTypes.array,
    }
    constructor(props) {
        super(props)
        this.state = {
            container: this.props.container,
            waterDrops: this.props.waterDrops,
        }
    }
}

export default WaterFall