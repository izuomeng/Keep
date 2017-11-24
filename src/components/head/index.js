import styled from 'styled-components'
import COLOR from '@/static/javascript/color'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import Menu from './menu'
import Title from './title'
import Search from './search'
import {LayerIcon,
        LayerIconII,
        RefreshIcon,
        MyReminder,
        SycnSuccess,
        SyncFail} from './icons'
import Avatar from './avatar'
import {StyledIconSnake as Snake} from '../indicator'
import {toggleLayout} from '@/store/action/app'

const Header = styled.header`
    width: 100%;
    background-color: ${COLOR.HEAD};
    padding: 8px;
    font-size: 22px;
    line-height: 48px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`
class HeaderContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isWaterFall: this.props.isWaterFall
        }
        this.onLayerClick = this.onLayerClick.bind(this)
    }
    onLayerClick() {
        this.setState({isWaterFall: !this.state.isWaterFall})
        requestAnimationFrame(this.props.toggleLayout)
    }
    render() {
        const progress = this.props.syncProgress
        const {isWaterFall} = this.state
        if (progress === 'SUCCESS' || progress === 'FAIL') {
            clearTimeout(this.tid)
            this.tid = setTimeout(() => this.props.setStatic(), 1000)
        }
        return (
            <Header>
                <Menu />
                <Title>
                    {this.props.children}
                </Title>
                <Search />
                {(progress === 'STATIC') && <RefreshIcon />}
                {(progress === 'PENDING') && <Snake />}
                {(progress === 'SUCCESS') && <SycnSuccess />}
                {(progress === 'FAIL') && <SyncFail />}
                {isWaterFall ? 
                    <LayerIcon handleClick={this.onLayerClick} /> :
                    <LayerIconII handleClick={this.onLayerClick} />
                }
                <MyReminder />
                <Avatar />
            </Header>
        )
    }
}

const mapState = (state) => ({
    syncProgress: state.app.syncProgress,
    isWaterFall: state.app.isWaterFall
})
const mapDispatch = (dispatch) => ({
    setStatic() {
        dispatch({type: 'SYNC_STATIC'})
    },
    toggleLayout() {
        dispatch(toggleLayout())
    }
})

export default connect(mapState, mapDispatch)(HeaderContainer)