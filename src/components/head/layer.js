import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'

const Layer = ({className}) => (
    <div className={className} title="布局">
        <span className="glyphicon glyphicon-th-list"></span>
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
`
export default StyledLayer