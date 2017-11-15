import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
`
const Wrapper = styled.div`
    position: absolute;
`
// 一个容器，放进去的子元素(props)可以自动按照瀑布流排列
class WaterFall extends Component {
    static propTypes = {
        waterDrops: PropTypes.array,
    }
    constructor(props) {
        super(props)
        const DOMWaterDrops = this.props.waterDrops.map()
        this.state = {
            waterDrops: this.props.waterDrops,
        }
    }
    render() {
        return (
            <Container />
        )
    }

}

export default WaterFall
