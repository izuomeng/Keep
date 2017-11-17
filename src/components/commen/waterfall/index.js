import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: absolute;
    top: ${props => props.top + 'px'};
    left: ${props => props.left + 'px'}
`
const hideStyle = {
    position: 'fixed',
    zIndex: -999,
    visibility: 'hidden'
}
const containerStyle = {
    position: 'relative'
}
class ComputeStyle extends Component {
    constructor(props) {
        super(props)
        this.DOMStyles = []
        this.DOMContainer = {}
    }
    componentDidMount() {
        const children = Array.from(this.DOMContainer.children)
        this.DOMStyles = children.map(el => ({
            key: el.dataset.key,
            height: parseInt(getComputedStyle(el).height, 10),
            width: parseInt(getComputedStyle(el).width, 10)
        }))
        this.props.handleStyles(this.DOMStyles)
    }
    render() {
        return (
            <div ref={ref => {this.DOMContainer = ref}} style={hideStyle}>
                {this.props.components}
            </div>
        )
    }
}

// 一个容器，放进去的子元素(props)可以自动按照瀑布流排列
class WaterFall extends Component {
    static propTypes = {
        waterDrops: PropTypes.array,
    }
    constructor(props) {
        super(props)
        this.state = {
            isDOMGet: false,
            waterDrops: this.props.waterDrops,
            layout: [],
            computeFinish: false
        }
        this.getStylePromise = new Promise((resolve) => {
            this.onStyleGet = (styles) => {
                this.waterDropStyle = styles
                this.setState({isDOMGet: true})
                resolve(styles)
            }
        })
        this.computeXY = this.computeXY.bind(this)
    }
    computeXY(waterDropStyle, containerStyle) {
         const columnCnt = parseInt(containerStyle.width / waterDropStyle[0].width, 10),
            layout = [],
            columns = Array(parseInt(columnCnt, 10)).fill(0),
            spacing = parseInt(this.props.spacing, 10) || 10,
            contentWidth = columnCnt * (waterDropStyle[0].width + spacing) - spacing,
            marginLeft = (containerStyle.width - contentWidth) / 2
        for (let i = 0, len = waterDropStyle.length; i < len; i++) {
            const min = findMin(columns)
            layout[i] = {
                top: min.value,
                left: min.index * (waterDropStyle[i].width + spacing) + marginLeft,
                key: waterDropStyle[i].key
            }
            columns[min.index] += (waterDropStyle[i].height + spacing)
            try {
                this.container.style.height = Math.max(...columns) + 'px'
            } catch(e){}
        }
        this.setState({computeFinish: true})
        return layout
    }
    componentDidMount() {
        this.container = this.refs.container
        const containerStyle = {
            width: parseInt(getComputedStyle(this.container).width, 10)
        }
        this.layout = this.computeXY(this.waterDropStyle, containerStyle)
    }
    render() {
        const {isDOMGet, waterDrops, computeFinish} = this.state
        return (
            <div style={{width: '100%'}}>
                {!isDOMGet && 
                <ComputeStyle 
                    components={waterDrops} 
                    handleStyles={this.onStyleGet}
                />}
                <div style={containerStyle} ref='container'>
                    {computeFinish && this.layout.map((v, i) => (
                        <Wrapper top={v.top} left={v.left} key={v.key}>
                            {waterDrops[i]}
                        </Wrapper>
                    ))}
                </div>
            </div>
        )
    }

}
//辅助函数，找到ary数组中的最小值和索引，返回值是个对象
function findMin(ary) {
    var min = {value: ary[0], index: 0}
    for(var i = 1; i < ary.length; i++){
        if(min.value > ary[i]){
            min.value = ary[i]
            min.index = i
        }
    }
    return min
}
export default WaterFall
