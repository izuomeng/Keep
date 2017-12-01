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
const Item = ({className, children, handleClick = () => {}}) => (
    <li className={className} onClick={handleClick}>
        {children}
    </li>
)
const StyledItem = styled(Item)`
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 48px;
    padding: 0 20px;
    color: ${COLOR.SIDEBAR_TEXT};
    &:hover{
        background-color: ${COLOR.SIDEBAR_HOVER};
    }
`

export default ({iconName, text, handleClick}) => (
    <StyledItem handleClick={handleClick}>
        <StyledIcon iconName={iconName} />
        {text}
    </StyledItem>
)