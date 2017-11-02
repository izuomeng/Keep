import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'
import {Link} from 'react-router'

const setColor = (colorLogin, colorRegister) => (props) => {
    if (props.type === 'button') {
        if (props.name === '登陆') return colorLogin
        else if (props.name === '注册') return colorRegister
    }
}

const Input = styled.input.attrs({
    type: props => props.type,
    placeholder: props => props.type === 'text' ? props.placeholder : '',
    value: props => props.type === 'button' ? props.name : ''
})`
    width: 100%;
    line-height: 42px;
    border-radius: 3px;
    border: 0;
    display: block;
    margin: 10px 0;
    padding: 0 10px;
    color: ${setColor('', 'white')};
    background-color: ${setColor(COLOR.HEAD, COLOR.BLUE_HEAD)};
    &:hover{
        background-color: ${setColor(COLOR.HEAD_BLUR, COLOR.BLUE_HEAD_BLUR)}
    }
`
const Title = ({className, children}) => (
    <h1 className={className}>
        {children}
    </h1>
)
const StyledTitle = styled(Title)`
    text-align: center
`
const Question = ({className, name}) => (
    <span>
        {name === '登陆' ? '没有账号？' : '已有账号？'}
        <Link to={name === '登陆' ? '/register' : '/login' }>
            {name === '登陆' ? '注册' : '登陆'}
        </Link>
    </span>
)

const Form = ({className, handleSubmit, name}) => (
    <form className={className} onSubmit={handleSubmit}>
        <StyledTitle>{name}</StyledTitle>
        <Input placeholder="输入用户名" type="text" />
        <Input placeholder="输入密码" type="password" />
        <Input type="button" name={name}/>
        <Question name={name} />
    </form>
)
const StyledForm = styled(Form)`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 300px;
    height: 215px;
    text-align: center;
`
const Container = ({className, name}) => (
    <div className={className}>
        <StyledForm name={name} />
    </div>
)
const StyledContainer = styled(Container)`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(232,232,232,0.9);
`
export {StyledContainer as Container}

export default () => (
    <StyledContainer name="登陆"/>
)
