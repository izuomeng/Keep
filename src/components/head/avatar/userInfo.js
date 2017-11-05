import React from 'react'
import styled from 'styled-components'
import COLOR from '../../../static/javascript/color'
import {NormalButton} from '../../button'

const Avatar = ({className, firstName, size, handleClick, children}) => (
    <div className={className} onClick={handleClick}>
        {firstName && firstName.toUpperCase()}
        {children}
    </div>
)
const StyledAvatar = styled(Avatar)`
    font-size: 18px;
    width: ${props => props.small ? '32px' : '96px'};
    height: ${props => props.small ? '32px' : '96px'};
    border-radius: 50%;
    text-align: center;
    color: white;
    cursor: pointer;
    background-color: ${COLOR.AVATAR};
    line-height: ${props => props.small ? '32px' : '96px'};
    font-size: ${props => props.small ? '12px' : '36px'};
`

const BlueButton = NormalButton.extend`
    color: #fff;
    background: #4d90fe;
    border-color: #3079ed;
    font-weight: bold;
    &:hover {
        background: #357ae8;
        border-color: #2f5bb7;
    }
`
const RightButton = NormalButton.extend`
    float: right;
`
const TopDiv = styled.div.attrs({
    name: 'myAvatar'
})`
    display: flex;
    padding: 20px;
`
const Info = styled.div.attrs({
    name: 'myAvatar'
})`
    text-align: left;
    width: 170px;
    padding-left: 20px;
`
const UserName = styled.div.attrs({
    name: 'myAvatar'
})`
    color: black;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: -8px;
    text-transform: capitalize;
`
const BottomDiv = styled.div.attrs({
    name: 'myAvatar'
})`
    padding: 10px 20px;
    background: #f5f5f5;
    border-top: 1px solid #ccc;
    text-align: left;
`
const Container = styled.div`
    display: ${props => props.show ? 'block' : 'none'};
    position: absolute;
    top: 55px;
    right: 10px;
    background: #fff;
    border-radius: 2px;
    cursor: default;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0,0,0,.2);
    @media (max-width: 600px) {
        display: none;
    }
`
export default ({firstName, show, name}) => (
    <Container show={show}>
        <TopDiv>
            <StyledAvatar firstName={firstName}/>
            <Info>
                <UserName>{name}</UserName>
                <BlueButton value='我的账号' />
            </Info>
        </TopDiv>
        <BottomDiv>
            <NormalButton value='切换账号' />
            <RightButton value='退出' />
        </BottomDiv>
    </Container>
)
export {StyledAvatar as Avatar}