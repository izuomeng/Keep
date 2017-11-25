import styled from 'styled-components'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import Top from './top'
import Tags from './tags'
import Trash from './trash'

const Aside = ({className, children, show}) => (
    <aside className={className}>
        {children}
    </aside>
)

const StyledAside = styled(Aside)`
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
`
class SideBar extends Component {
    render() {
        return (
            <Container show={this.props.show}>
                <StyledAside>
                    <Top />
                    <Tags />
                    <Trash />
                </StyledAside>
            </Container>
        )
    }
}
const mapState = (state) => ({
    show: state.app.sidebar
})
export default connect(mapState, null)(SideBar)