import styled from 'styled-components'
import React, { Component } from 'react'
import Top from './top'
import Tags from './tags'
import Trash from './trash'

const Aside = ({className, children}) => (
    <aside className={className}>
        {children}
    </aside>
)

const StyledAside = styled(Aside)`
    width: 280px;
    height: calc(100vh - 64px);
    overflow: auto;
    float: left;
`
class SideBar extends Component {
    render() {
        return (
            <StyledAside>
                <Top />
                <Tags />
                <Trash />
            </StyledAside>
        )
    }
}
export default SideBar