import styled from 'styled-components'
import COLOR from '../../static/javascript/color'
import FONT from '../../static/javascript/font'
import React, { Component } from 'react'
import Menu from './menu'
import Title from './title'
import Search from './search'

const Header = styled.header`
    width: 100%;
    background-color: ${COLOR.HEAD};
    padding: 8px;
    font-size: ${FONT.Title};
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
            </Header>
        )
    }
}

export default HeaderContainer