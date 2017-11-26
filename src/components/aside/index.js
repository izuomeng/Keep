import styled from 'styled-components'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {minWidthToHideSidebar} from '@/static/javascript/constants'
import {hideSidebar} from '@/store/action/app'
import Top from './top'
import Tags from './tags'
import Trash from './trash'

const Container = styled.div`
    height: calc(100vh - 64px);
    transition: ${props => props.show ? '.2s' : 'none'};
    position: absolute;
    z-index: 100;
    top: 64px;
    left: ${props => props.show ? '0' : '-300px'};
    width: 280px;
    font-size: 14px;
    overflow: scroll;
    will-change: transform;
    visibility: ${props => props.show ? 'visible' : 'hidden'};
    @media (max-width: ${minWidthToHideSidebar}px) {
        background: #FFFFFF;
        box-shadow: 0 0 16px rgba(0,0,0,.28);
        top: 0;
        height: 100vh;
        &::before {
            content: 'Keep';
            width: 100%;
            height: 48px;
            display: block;
            padding-left: 34px;
            vertical-align: middle;
            font-size: 23px;
            color: #767676;
        }
	}
`
class SideBar extends Component {
    constructor(props) {
        super(props)
        this.change = this.change.bind(this)
        this.clickToHide = this.clickToHide.bind(this)
        window.addEventListener('resize', this.change)
        document.addEventListener('click', this.clickToHide)
    }
    change() {
        if (window.innerWidth <= minWidthToHideSidebar) {
            this.props.hideSidebar()
        }
    }
    clickToHide(e) {
        if (e.target.dataset.id === 'sidebar') {
            return
        }
        if (window.innerWidth <= minWidthToHideSidebar) {
            this.props.hideSidebar()
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.change)
        window.removeEventListener('scroll', this.scrollToHide)
        document.removeEventListener('click', this.clickToHide)
    }
    render() {
        return (
            <Container show={this.props.show}>
                <Top />
                <Tags />
                <Trash />
            </Container>
        )
    }
}
const mapState = (state) => ({
    show: state.app.sidebar
})
const mapDispatch = (dispatch) => ({
    hideSidebar() {
        dispatch(hideSidebar())
    }
})
export default connect(mapState, mapDispatch)(SideBar)