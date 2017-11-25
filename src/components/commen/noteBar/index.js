import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import {TextButton} from '../button'
import Palette from './palette'
import Icon from './icon'

const Wrapper = styled.div.attrs({
    'data-id': 'newNote'
})`
    display: flex;
    justify-content: space-between;
    max-width: 350px;
`
const CompleteButton = TextButton.extend`
    float: right;
    font-weight: bold;
`

class Menus extends Component {
    static propTypes = {
        onColorClick: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.onMoreClick = this.onMoreClick.bind(this)
    }
    onMoreClick() {
        
    }
    render() {
        const {isInCard, bgColor, onColorClick, onArchiveClick} = this.props
        const path = browserHistory.getCurrentLocation().pathname,
            archiveLable = path.indexOf('archive') > -1 ? '取消归档' : '归档'
        return (
            <Wrapper>
                <Icon icon="glyphicon glyphicon-bell" lable="提醒我"/>
                <Icon icon="glyphicon glyphicon-eye-open" lable="更改颜色">
                    <Palette 
                        handleClick={onColorClick}
                        bgColor={bgColor}
                    />
                </Icon>
                <Icon icon="glyphicon glyphicon-picture" lable="插入图片"/>
                <Icon 
                    icon="glyphicon glyphicon-folder-close" 
                    lable={archiveLable}
                    handleClick={onArchiveClick}
                />
                <Icon 
                    icon="glyphicon glyphicon-chevron-down" 
                    lable="更多"
                    handleClick={this.onMoreClick}
                >
                </Icon>
                {!isInCard&&<Icon icon="glyphicon glyphicon-arrow-left" lable="撤销"/>}
                {!isInCard&&<Icon icon="glyphicon glyphicon-arrow-right" lable="重做"/>}
            </Wrapper>
        )
    }
}
export default Menus
export {CompleteButton}