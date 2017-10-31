import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'
import Item from './item'

const Button = styled.input.attrs({
    type: 'button',
    value: '修改'
})`
    width: 54px;
    float: right;
    background-color: ${COLOR.BACKGROUND};
    border: 0;
    padding: 0;
    line-height: 28px;
    border-radius: 3px;
    &:hover{
        background-color: ${COLOR.SIDEBAR_HOVER};
    }
`
const Title = ({className}) => (
    <div className={className}>
        标签<Button />
    </div>
)
const StyledTitle = styled(Title)`
    color: black;
    margin: 10px 0;
    padding: 0 20px;
    line-height: 28px;
    font-weight: bold;
`

const Container = ({className}) => (
    <ul className={className}>
        <StyledTitle />
        <Item iconName="glyphicon glyphicon-tag" text="Tag1" />
        <Item iconName="glyphicon glyphicon-plus" text="创建新标签" />
    </ul>
)
const StyledContainer = styled(Container)`
    margin: 20px 0 0 0;
    border-bottom: 1px solid ${COLOR.LINE};
    padding: 0 0 10px 0;
`

export default StyledContainer