import styled from 'styled-components'
import React from 'react'
import COLOR from '../commen/color'
import {connect} from 'react-redux'
import {toggleSidebar} from '@/store/action/app'

const Menu = ({className, handleClick}) => (
    <div className={className} onClick={handleClick} data-id='sidebar'>
        <span className="glyphicon glyphicon-align-justify" data-id='sidebar'></span>
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