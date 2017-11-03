import React, {Component} from 'react'
import styled from 'styled-components'
import store from '../../store'
import {AUTH_CLEAR} from '../../store/actionTypes/auth'

const Pop = ({className, children}) => (
    <div className={className}>
        {children}
    </div>
)
const StyledPop = styled(Pop)`
    display: ${props => props.show ? 'block' : 'none'};
    min-width: 200px;
    text-align: center;
    border-radius: 3px;
    background-color: rgba(0,0,0,0.7);
    padding: 10px;
    color: white;
    position: absolute;
    top: -30px;
    left: calc(50% - 100px);
`
class PopUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
    }
    componentDidMount() {
        clearTimeout(this.timeId)
        this.timeId = setTimeout(() => {
            this.setState({show: false})
            store.dispatch({type: AUTH_CLEAR})
        }, 2000)
    }
    componentWillUnmount() {
        clearTimeout(this.timeId)
        this.setState({show: false})
    }
    render() {
        const show = this.state.show
        return (
            <StyledPop show={show}>
                {this.props.children}
            </StyledPop>
        )
    }
}
export default PopUp