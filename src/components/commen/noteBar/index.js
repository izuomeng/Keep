import React, {Component} from 'react'
import styled from 'styled-components'
import {TextButton} from '../button'
import COLOR from '../color'
import Lable from '../lable'
import PropTypes from 'prop-types'
import {confirm} from '@/static/javascript/icons'
import {browserHistory} from 'react-router'

const Wrapper = styled.div.attrs({
    'data-id': 'newNote'
})`
    display: flex;
    justify-content: space-between;
    max-width: 350px;
`
const Icon = ({className, icon, lable, children, handleClick = ()=>{}}) => (
    <div className={className} data-id='newNote' onClick={handleClick}>
        <span className={icon} data-id='newNote'></span>
        {children}
        <Lable value={lable} />
    </div>
)
const StyledIcon = styled(Icon)`
    display: inline-block;
    position: relative;
    color: #747474;
    cursor: pointer;
    padding: 5px 10px;
    &:hover {
        color: black;
    }
    &:hover>div {
        display: inline-block;
        visibility: visible;
    }
    &:hover #palette {
        opacity: 1;
    }
`
const CompleteButton = TextButton.extend`
    float: right;
    font-weight: bold;
`
const ColorBlock = styled.div`
    position: relative;
    display: inline-block;
    background-color: ${props => props.color};
    background-image: ${props => props.bgImg ? `url(${props.bgImg})` : ''};
    background-size: contain;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    margin: 4px 2px;
    border: 2px solid ${props => props.color};
    &:hover {
        border: 2px solid grey
    }
    &:hover>div {
        display: inline-block;
    }
`
const StyledLable = Lable.extend`
    margin-left: 19px;
    z-index: 999;
`
const PaletteWrapper = styled.div.attrs({
    id: 'palette',
    'data-id': 'newNote'
})`
    line-height: 0;
    background: white;
    width: 132px;
    opacity: 0;
    transition: .3s;
    padding: 6px;
    box-shadow: 0 0 10px 0 darkgrey;
`
const Palette = ({className, handleClick, bgColor}) => {
    const colors = [
        COLOR.WHITE,
        COLOR.RED,
        COLOR.ORANGE,
        COLOR.YELLOW,
        COLOR.GREEN,
        COLOR.CYAN_BLUE,
        COLOR.BLUE,
        COLOR.DARK_BLUE,
        COLOR.PURPLE,
        COLOR.PINK,
        COLOR.BROWN,
        COLOR.GREY
    ],
    names = ['白','红','橙','黄','绿','青','蓝','深蓝','紫','粉','棕','灰']
    return (
        <div className={className}>
            <PaletteWrapper>
                {colors.map((v, i) => {
                    let current = ''
                    if (v === bgColor) {
                         current = confirm
                    }
                    return (
                        <ColorBlock 
                            color={v} 
                            key={v} 
                            data-id="newNote" 
                            onClick={() => handleClick(v)}
                            bgImg={current}
                        >
                            <StyledLable value={names[i] + '色'} />
                        </ColorBlock>
                    )
                })}
            </PaletteWrapper>
        </div>
    )
}
const StyledPalette = styled(Palette)`
    display: inline-block;
    visibility: hidden;
    position: absolute;
    top: -113px;
    left: 5px;
    z-index: 999;
    &:hover ~div {
        display: none;
    }
`
class Menus extends Component {
    static propTypes = {
        onColorClick: PropTypes.func.isRequired
    }
    render() {
        const {isInCard, bgColor, onColorClick, onArchiveClick} = this.props
        const path = browserHistory.getCurrentLocation().pathname,
            archiveLable = path.indexOf('archive') > -1 ? '取消归档' : '归档'
        return (
            <Wrapper>
                <StyledIcon icon="glyphicon glyphicon-bell" lable="提醒我"/>
                <StyledIcon icon="glyphicon glyphicon-eye-open" lable="更改颜色">
                    <StyledPalette 
                        handleClick={onColorClick}
                        bgColor={bgColor}
                    />
                </StyledIcon>
                <StyledIcon icon="glyphicon glyphicon-picture" lable="插入图片"/>
                <StyledIcon 
                    icon="glyphicon glyphicon-folder-close" 
                    lable={archiveLable}
                    handleClick={onArchiveClick}
                />
                <StyledIcon icon="glyphicon glyphicon-chevron-down" lable="更多"/>
                {!isInCard&&<StyledIcon icon="glyphicon glyphicon-arrow-left" lable="撤销"/>}
                {!isInCard&&<StyledIcon icon="glyphicon glyphicon-arrow-right" lable="重做"/>}
            </Wrapper>
        )
    }
}
export default Menus
export {CompleteButton}