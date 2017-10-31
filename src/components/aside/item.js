import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'

const Icon = ({iconName, className}) => (
    <div className={className}>
        <span className={iconName}></span>
    </div>
)
const StyledIcon = styled(Icon)`
    display: inline-block;
    height: 48px;
    width: 48px;
    margin-right: 20px;
    text-align: center;
    font-size: 20px;
    vertical-align: middle;
`
const Item = ({className, children}) => (
    <li className={className}>
        {children}
    </li>
)
const StyledItem = styled(Item)`
    cursor: pointer;
    line-height: 48px;
    padding: 0 20px;
    color: ${COLOR.SIDEBAR_TEXT};
    &:hover{
        background-color: ${COLOR.SIDEBAR_HOVER};
    }
`

export default ({iconName, text}) => (
    <StyledItem>
        <StyledIcon iconName={iconName} />
        {text}
    </StyledItem>
)