import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'

const Refresh = ({className}) => (
    <div className={className}>
        <span className="glyphicon glyphicon-repeat"></span>
    </div>
)
const StyledRefresh = styled(Refresh)`
    font-size: 18px;
    width: 48px;
    text-align: center;
    color: ${COLOR.ICON};
    cursor: pointer;
    &:hover{
        color: black
    }
`
export default StyledRefresh