import React from 'react'
import styled, {keyframes} from 'styled-components'

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
    margin-bottom: 10px;
`

const Wrapper = ({className, size, color = 'white', children}) => {
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
            <div>{children}</div>
        </div>
    )
}

const StyledWrapper = styled(Wrapper)`
    display: inline-block;
    padding: 15px 25px;
    background-color: rgba(0,0,0,0.7);
    border-radius: 5px;
    color: ${props => props.color};
    text-align: center;
`

export default StyledWrapper