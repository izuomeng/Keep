import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {connect} from 'react-redux'
import Card from '../../cards/card'
import COLOR from '../color'
import shouldUpdate from '@/lib/shouldUpdate'
import {minWidthToHideSidebar} from '@/static/javascript/constants'

const Wrapper = styled.div.attrs({
    style: props => ({transform: `translate(${props.left}px, ${props.top}px`})
})`
    position: absolute;
    transition: .2s;
    will-change: transform;
`
const Container = styled.div`
    position: relative;
    height: ${props => props.height + 'px'}
`
const WaterFallContainer = styled.div`

`
const Label = styled.div`
    margin: 20px 0;
    margin-left: ${props => props.left}px;
    font-size: 14px;
    font-weight: bold;
    color: ${COLOR.FIX_STATUS};
    transition: .2s;
`
// 一个容器，放进去的子元素(props)可以自动按照瀑布流排列
class WaterFall extends Component {
    static propTypes = {
        notes: PropTypes.array.isRequired
    }
    constructor(props) {
        super(props)
        this.waterDropStyle = this.props.notes.map((v) => ({
            width: 240,
            height: v.height,
            key: v.id
        }))
        const windowWidth = window.innerWidth || document.documentElement.clientWidth || 
                document.body.clientWidth
        if (window.innerWidth > minWidthToHideSidebar) {
            this.containerWidth = this.props.sidebar ? windowWidth - 340 : windowWidth - 60
        } else {
            this.containerWidth = windowWidth - 80
        }
        const layout = this.computeXY(this.waterDropStyle,{width: this.containerWidth})
        this.state = {
            layout: layout || [],
            notes: this.props.notes,
            containerWidth: 0,
            sidebar: this.props.sidebar
        }
        this.computeXY = this.computeXY.bind(this)
        this.onResize = this.onResize.bind(this)
        this.shouldComponentUpdate = shouldUpdate.bind(this)
        window.addEventListener('resize', this.onResize)
    }
    computeXY(waterDropStyle, containerStyle) {
        if (waterDropStyle.length <= 0) {
            return
        }
         const spacing = parseInt(this.props.spacing, 10) || 10,
            columnCnt = parseInt(containerStyle.width / (waterDropStyle[0].width + spacing), 10),
            layout = [],
            columns = Array(Math.max(columnCnt, 1)).fill(0),
            contentWidth = columnCnt * (waterDropStyle[0].width + spacing) - spacing,
            marginLeft = (containerStyle.width - contentWidth) / 2 + 20
        for (let i = 0, len = waterDropStyle.length; i < len; i++) {
            const min = findMin(columns)
            layout[i] = {
                top: min.value,
                left: min.index * (waterDropStyle[i].width + spacing) + marginLeft,
                key: waterDropStyle[i].key
            }
            columns[min.index] += (waterDropStyle[i].height + spacing)
        }
        this.height = Math.max(...columns)
        return layout
    }
    onResize() {
        clearTimeout(this.rid)
        const windowWidth = window.innerWidth || document.documentElement.clientWidth || 
            document.body.clientWidth
        this.containerWidth = this.props.sidebar ? windowWidth - 340 : windowWidth - 60
        if (this.containerWidth < 600) {
            this.containerWidth = 600
        }
        const layout = this.computeXY(this.waterDropStyle,{
            width: this.containerWidth
        })
        this.rid = setTimeout(() => {
            this.setState({layout})
        }, 200)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.sidebar !== this.state.sidebar) {
            if (window.innerWidth > minWidthToHideSidebar) {
                this.setState({sidebar: nextProps.sidebar})
                return requestAnimationFrame(this.onResize)
            } else {
                this.setState({sidebar: nextProps.sidebar})
            }
        }
        const waterDropStyle = nextProps.notes.map((v) => ({
            width: 240,
            height: v.height,
            key: v.id
        }))
        this.waterDropStyle = waterDropStyle
        const width = this.containerWidth
        const layout = this.computeXY(waterDropStyle, {width})
        this.setState({layout, notes: nextProps.notes})
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }
    render() {
        const {notes, layout} = this.state
        const {label} = this.props
        return (
            <WaterFallContainer>
                {label && 
                <Label left={layout[0].left}>
                    {label}
                </Label>}
                <Container height={this.height}>
                    {layout.map((v, i) => (
                        <Wrapper top={v.top} left={v.left} key={v.key}>
                            <Card note={notes[i]}/>
                        </Wrapper>
                    ))}
                </Container>
            </WaterFallContainer>
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

const mapState = (state) => ({
    sidebar: state.app.sidebar
})
export default connect(mapState, null)(WaterFall)
