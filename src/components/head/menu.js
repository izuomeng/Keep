import styled from 'styled-components'
import React from 'react'
import COLOR from '../../static/javascript/color'

const Menu = ({className}) => (
    <div className={className}>
        <span className="glyphicon glyphicon-align-justify"></span>
    </div>
)
const StyledMenu = styled(Menu)`
    font-size: 18px;
    display: inline-block;
    width: 48px;
    margin: 0 20px;
    text-align: center;
    color: ${COLOR.ICON};
    border-radius: 24px;
    cursor: pointer;
    &:hover{
        background-color: ${COLOR.ICON_HOVER}
    }
`
export default StyledMenu