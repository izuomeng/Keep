import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'
import Lable from '../lable'

const StyledLable = Lable.extend`
    top: 40px;
    line-height: normal;
    margin-left: -2px; 
`

const Icon = ({className, iconClass, lable}) => (
    <div className={className}>
        <span className={iconClass}></span>
        <StyledLable value={lable} />
    </div>
)
const SimpleIcon =  ({className, iconClass}) => (
    <div className={className}>
        <span className={iconClass}></span>
    </div>
)
const StyledSimpleIcon = styled(SimpleIcon)`
    position: relative;
    font-size: 18px;
    width: 48px;
    text-align: center;
    color: ${COLOR.ICON};
    cursor: default;
`
const StyledIcon = styled(Icon)`
    position: relative;
    font-size: 18px;
    width: 48px;
    text-align: center;
    color: ${COLOR.ICON};
    cursor: pointer;
    &:hover{
        color: black
    }
    &:hover>div{
        display: inline-block;
    }
`
const LayerIcon = () => (
    <StyledIcon iconClass="glyphicon glyphicon-th-list" lable="切换布局" />
)
const RefreshIcon = () => (
    <StyledIcon iconClass="glyphicon glyphicon-repeat" lable="刷新" />
)
const MyReminder = () => (
    <StyledIcon iconClass="glyphicon glyphicon-time" lable="通知" />
)
const SycnSuccess = () => (
    <StyledSimpleIcon iconClass="glyphicon glyphicon-ok-sign" />
)
export {
    LayerIcon,
    RefreshIcon,
    MyReminder,
    SycnSuccess
}