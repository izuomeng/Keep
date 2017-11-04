import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'
import {connect} from 'react-redux'

const Avatar = ({className, firstName}) => (
    <div className={className}>
        {firstName.toUpperCase()}
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
    background-color: ${COLOR.AVATAR};
    line-height: 32px;
    font-size: 12px;
    margin-left: 10px;
    margin-right: 20px;
`
const mapState = (state) => ({
    firstName: state.user.name.slice(0,1)
})
export default connect(mapState, null)(StyledAvatar)