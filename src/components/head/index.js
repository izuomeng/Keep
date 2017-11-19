import styled from 'styled-components'
import COLOR from '@/static/javascript/color'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import Menu from './menu'
import Title from './title'
import Search from './search'
// import Refresh from './refresh'
import {LayerIcon, 
        RefreshIcon, 
        MyReminder, 
        SycnSuccess, 
        SyncFail} from './icons'
import Avatar from './avatar'
import {StyledIconSnake as Snake} from '../indicator'

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
    render() {
        const progress = this.props.syncProgress
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
                <LayerIcon />
                <MyReminder />
                <Avatar />
            </Header>
        )
    }
}

const mapState = (state) => ({
    syncProgress: state.syncProgress
})
const mapDispatch = (dispatch) => ({
    setStatic() {
        dispatch({type: 'SYNC_STATIC'})
    }
})

export default connect(mapState, mapDispatch)(HeaderContainer)