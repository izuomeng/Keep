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
    height: calc(100vh - 64px);
    overflow: auto;
    transition: .2s;
    will-change: transform;
    margin-left: ${props => props.show ? '0' : '-280px'}
`
class SideBar extends Component {
    render() {
        return (
            <StyledAside show={this.props.show}>
                <Top />
                <Tags />
                <Trash />
            </StyledAside>
        )
    }
}
const mapState = (state) => ({
    show: state.sidebar
})
export default connect(mapState, null)(SideBar)