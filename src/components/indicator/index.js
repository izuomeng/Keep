import React, {Component} from 'react'
import styled, {keyframes} from 'styled-components'
import emmiter from '@/lib/events'
import COLOR from '../../static/javascript/color'

const rotate = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg)
    }
`

const Snake = styled.div`
    display: inline-block;
    border-radius: 50%;
    border: ${props => (parseInt(props.size,10)/10 + 'px')} solid transparent;
    height: ${props => props.size};
    width: ${props => props.size};
    border-top-color: ${props => props.color};
    border-left-color: ${props => props.color};
    border-bottom-color: ${props => props.color};
    animation: ${rotate} .8s linear infinite;
    will-change: transform;
`

const Text = styled.div`
    margin-top: 10px;
`
const Wrapper = ({className, size = 'middle', color = 'white', children}) => {
    switch (size) {
        case 'large':
            size = '60px'
            break
        case 'middle':
            size = '40px'
            break
        case 'small':
            size = '20px'
            break
        default:
            size = '40px'
            break 
    }
    return (
        <div className={className}>
            <Snake size={size} color={color}/>
            <Text>{children}</Text>
        </div>
    )
}

const StyledWrapper = styled(Wrapper)`
    padding: 15px 25px;
    background-color: rgba(0,0,0,0.7);
    border-radius: 5px;
    color: ${props => props.color};
    text-align: center;
`
const FullScreen = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(232,232,232,0.9);
    display: ${props => props.show ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
`

class FullScreenIndicator extends Component{
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        this.onLoading = () => this.setState({show: true})
        this.onStopLoading = () => this.setState({show: false})
    }
    componentDidMount() {
        emmiter.addListener('loading', this.onLoading)
        emmiter.addListener('stopLoading', this.onStopLoading)
    }
    componentWillUnmount() {
        emmiter.removeListener('loading', this.onLoading)
        emmiter.removeListener('stopLoading', this.onStopLoading)
    }
    render() {
        return (
            <FullScreen show={this.state.show}>
                <StyledWrapper size='middle' color='orange'>加载中...</StyledWrapper>
            </FullScreen>
        )
    }
}
const NoStateIndicator = ({show}) => (
    <FullScreen show={show}>
        <StyledWrapper size='middle' color='orange'>加载中...</StyledWrapper>
    </FullScreen>
)

const IconSnake = ({className}) => (
    <div className={className}>
        <Snake size="20px" color={COLOR.ICON} />
    </div>
)
const StyledIconSnake = styled(IconSnake)`
    width: 48px;
    text-align: center;
`
export default FullScreenIndicator
export {NoStateIndicator, StyledIconSnake}