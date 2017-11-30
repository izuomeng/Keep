import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import COLOR from '@/static/javascript/color'
import {Link} from 'react-router'
import {authenticate} from '@/store/action/popInfo'
import store from '@/store'
import {browserHistory} from 'react-router'

const setColor = (colorLogin, colorRegister) => (props) => {
    if (props.type === 'submit') {
        if (props.name === '登陆') return colorLogin
        else if (props.name === '注册') return colorRegister
    }
}

const Input = styled.input.attrs({
    type: props => props.type,
    placeholder: props => props.type === 'text' ? props.placeholder : '',
    value: props => props.type === 'submit' ? props.name : ''
})`
    width: 100%;
    vertical-align: middle;
    height: 42px;
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

class Form extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            userpass: '',
        }
        this.handleNameInput = this.handleNameInput.bind(this)
        this.handlePassInput = this.handlePassInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.unsubscribe = store.subscribe(()=> {
            const user = store.getState()['user']
            if (user.name) {
                browserHistory.push('/')
            }
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
        clearTimeout(this.tid)
    }
    handleSubmit(event) {
        event.preventDefault()
        const {username, userpass} = this.state
        if (!username.trim() || !userpass.trim()) {
            return
        }
        this.props.handleSubmit(this.state.username, this.state.userpass)
        this.setState({username: '', userpass: ''})
    }
    handleNameInput(event) {
        this.setState({username: event.target.value})
    }
    handlePassInput(event) {
        this.setState({userpass: event.target.value})
    }
    render() {
        const {className, name} = this.props
        return (
            <form className={className} onSubmit={this.handleSubmit}>
                <StyledTitle>{name}</StyledTitle>
                <Input placeholder="输入用户名" type="text" 
                    onChange={this.handleNameInput} value={this.state.username} />
                <Input placeholder="输入密码" type="password"
                    onChange={this.handlePassInput} value={this.state.userpass} />
                <Input type="submit" name={name}/>
                <Question name={name} />
            </form>
        )
    }
}

const StyledForm = styled(Form)`
    margin: 0 auto;
    width: 300px;
    height: 215px;
    text-align: center;
`

const Container = ({className, name, handleSubmit}) => (
    <div className={className}>
        <StyledForm name={name} handleSubmit={handleSubmit}/>
    </div>
)
const StyledContainer = styled(Container)`
    position: absolute;
    padding: 40px;
    left: 0;
    top: 0;
    bottom: 0;
    min-height: 300px;
    width: 100%;
    background-color: rgba(232,232,232,0.9);
    z-index: 999;
`

const mapDispatch = (dispatch) => ({
    handleSubmit(name, pass) {
        dispatch(authenticate('/login', name, pass))
    }
})
const WrapperContainer = connect(null, mapDispatch)(StyledContainer)

export {StyledContainer as Container}
export default () => (
    <WrapperContainer name='登陆'/>
)
