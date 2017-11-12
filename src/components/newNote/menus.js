import React, {Component} from 'react'
import styled from 'styled-components'
import {TextButton} from '../button'
import COLOR from '../../static/javascript/color'
import Lable from '../lable'

const Wrapper = styled.div`

`
const Icon = ({className, icon, lable}) => (
    <div className={className}>
        <span className={icon}></span>
        <Lable value={lable} />
    </div>
)
const StyledIcon = styled(Icon)`
    display: inline-block;
    position: relative;
    color: #747474;
    cursor: pointer;
    padding: 5px 10px;
    margin-right: 15px;
    &:hover>div {
        display: inline-block;
    }
`
const Complete = TextButton.extend`
    background: ${COLOR.CARD_BACK};
    float: right;
    font-weight: bold;
`
class Menus extends Component {
    render() {
        return (
            <Wrapper>
                <StyledIcon icon="glyphicon glyphicon-bell" lable="提醒我"/>
                <StyledIcon icon="glyphicon glyphicon-eye-open" lable="更改颜色"/>
                <StyledIcon icon="glyphicon glyphicon-picture" lable="插入图片"/>
                <StyledIcon icon="glyphicon glyphicon-folder-close" lable="归档"/>
                <StyledIcon icon="glyphicon glyphicon-chevron-down" lable="更多"/>
                <StyledIcon icon="glyphicon glyphicon-arrow-left" lable="撤销"/>
                <StyledIcon icon="glyphicon glyphicon-arrow-right" lable="重做"/>
                <Complete value='完成'/>
            </Wrapper>
        )
    }
}
export default Menus