import React from 'react'
import styled from 'styled-components'
import Lable from '../commen/lable'

const StyledLable = Lable.extend `
    top: 40px;
    line-height: normal;
    margin-left: -2px; 
`
const Icon = ({
  className,
  iconClass,
  lable,
  handleClick = () => {}
}) => (
  <div className={className} onClick={handleClick}>
    <span className={iconClass}></span>
    <StyledLable value={lable}/>
  </div>
)
const SimpleIcon = ({className, iconClass}) => (
  <div className={className}>
    <span className={iconClass}></span>
  </div>
)
const StyledSimpleIcon = styled(SimpleIcon)`
  position: relative;
  font-size: 18px;
  width: 48px;
  text-align: center;
  cursor: default;
`
const StyledIcon = styled(Icon)`
  position: relative;
  font-size: 18px;
  width: 48px;
  text-align: center;
  cursor: pointer;
  &:hover{
    color: ${props => props.hovColor || 'black'}
  }
  &:hover>div{
    visibility: visible;
  }
`
const iconFactory = 
  (iconClass, lable) => 
    ({handleClick, hovColor}) => 
      (<StyledIcon
        lable={lable}
        hovColor={hovColor}
        iconClass={iconClass}
        handleClick={handleClick}/>)
const SycnSuccess = () => 
  (<StyledSimpleIcon iconClass="glyphicon glyphicon-ok-sign"/>)
const SyncFail = () => 
  (<StyledSimpleIcon iconClass="glyphicon glyphicon-remove-sign"/>)

const LayerIcon = iconFactory('glyphicon glyphicon-th-list', '列表视图')
const LayerIconII = iconFactory('glyphicon glyphicon-th', '网格视图')
const RefreshIcon = iconFactory('glyphicon glyphicon-repeat', '刷新')
const MyReminder = iconFactory('glyphicon glyphicon-time', '通知')

export {
  LayerIcon,
  LayerIconII,
  RefreshIcon,
  MyReminder,
  SycnSuccess,
  SyncFail
}