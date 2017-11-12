import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'
import Lable from '../lable'

const StyledLable = Lable.extend`
    top: 50px;
    line-height: normal;
    margin-left: -18px;
`

const Layer = ({className}) => (
    <div className={className}>
        <span className="glyphicon glyphicon-th-list"></span>
        <StyledLable value="切换布局" />
    </div>
)
const StyledLayer = styled(Layer)`
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
export default StyledLayer