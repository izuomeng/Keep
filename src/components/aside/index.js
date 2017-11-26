import styled from 'styled-components'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {minWidthToHideSidebar} from '@/static/javascript/constants'
import {hideSidebar} from '@/store/action/app'
import Top from './top'
import Tags from './tags'
import Trash from './trash'

const Aside = styled.div`
    width: 280px;
    font-size: 14px;
    height: 100%;
    overflow: scroll;
    will-change: transform;
`
const Container = styled.div`
    height: calc(100vh - 64px);
    transition: .2s;
    position: absolute;
    top: 64px;
    left: ${props => props.show ? '0' : '-280px'};
    @media (max-width: ${minWidthToHideSidebar}px) {
		background: white;
	}
`
class SideBar extends Component {
    constructor(props) {
        super(props)
        this.change = this.change.bind(this)
        window.addEventListener('resize', this.change)
    }
    change() {
        if (window.innerWidth <= minWidthToHideSidebar) {
            this.props.hideSidebar()
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.change)
    }
    render() {
        return (
            <Container show={this.props.show}>
                <Aside>
                    <Top />
                    <Tags />
                    <Trash />
                </Aside>
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