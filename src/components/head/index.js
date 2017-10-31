import styled from 'styled-components'
import COLOR from '../../static/javascript/color'
import React, { Component } from 'react'
import Menu from './menu'
import Title from './title'
import Search from './search'
import Refresh from './refresh'
import Layer from './layer'
import Avatar from './avatar'

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
        return (
            <Header>
                <Menu />
                <Title>
                    {this.props.children}
                </Title>
                <Search />
                <Refresh />
                <Layer />
                <Avatar />
            </Header>
        )
    }
}

export default HeaderContainer