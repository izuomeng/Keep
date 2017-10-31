import styled from 'styled-components'
import React from 'react'
import COLOR from '../../static/javascript/color'
import {connect} from 'react-redux'
import {toggleSidebar} from '../../store/action'

const Menu = ({className, handleClick}) => (
    <div className={className} onClick={handleClick}>
        <span className="glyphicon glyphicon-align-justify"></span>
    </div>
)
const StyledMenu = styled(Menu)`
    font-size: 18px;
    display: inline-block;
    width: 48px;
    margin-left: 10px;
    margin-right: 20px;
    text-align: center;
    color: ${COLOR.ICON};
    border-radius: 24px;
    cursor: pointer;
    &:hover{
        background-color: ${COLOR.ICON_HOVER}
    }
`
const mapDispatch = (dispatch) => ({
    handleClick() {
        dispatch(toggleSidebar())
    }
})
export default connect(null, mapDispatch)(StyledMenu)