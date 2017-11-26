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
    z-index: 990;
    width: 100%;
    background-color: ${COLOR.HEAD};
    padding: 8px;
    font-size: 22px;
    line-height: 48px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    position: fixed;
    transition: .4s;
    box-shadow: ${props => props.shadow ? 
        `0 4px 5px 0 rgba(0,0,0,0.14),
        0 1px 10px 0 rgba(0,0,0,0.12),
        0 2px 4px -1px rgba(0,0,0,0.2);` :
        '0'
    }
`
class HeaderContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isWaterFall: this.props.isWaterFall,
            shadow: false
        }
        this.onLayerClick = this.onLayerClick.bind(this)
        this.tesShadow = this.tesShadow.bind(this)
        window.addEventListener('scroll', this.tesShadow)
    }
    tesShadow() {
        clearTimeout(this.tid)
        this.tid = setTimeout(() => {
            if (document.documentElement.scrollTop > 0) {
                this.setState({shadow: true})
            } else {
                this.setState({shadow: false})
            }
        }, 100)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.tesShadow)
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
            <Header shadow={this.state.shadow}>
                <Menu />
                <Title>
                    Keep
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
                {this.props.children}
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