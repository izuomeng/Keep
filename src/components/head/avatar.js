import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'

const Avatar = ({className}) => (
    <div className={className}>
        Z
    </div>
)
const StyledAvatar = styled(Avatar)`
    font-size: 18px;
    width: 32px;
    height: 32px;
    border-radius: 16px;
    text-align: center;
    color: white;
    cursor: pointer;
    background-color: ${COLOR.DARK_BLUE};
    line-height: 32px;
    font-size: 12px;
    margin-left: 20px;
`
export default StyledAvatar