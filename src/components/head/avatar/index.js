import React, {Component} from 'react'
import {connect} from 'react-redux'
import Info, {Avatar} from './userInfo'
import {removeUser} from '../../../store/action/user'
import {FullScreenIndicator} from '../../../components'
import styled from 'styled-components'
import store from '../../../store'
import {browserHistory} from 'react-router'
import Pop from '../../popup'
import {clearAuth} from '../../../store/action/auth'

const SmallAvatar = Avatar.extend`
    margin: 0 10px;
`
const Loading = styled.div`
    display: ${props => props.show ? 'block' : 'none'}
`
class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isInfoShow: false,
            isLoading: false,
            message: ''
        }
        this.toggleInfo = this.toggleInfo.bind(this)
        this.hideInfo = this.hideInfo.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.unsubscribe = store.subscribe(() => {
            const user = store.getState()['user']
            if (user.logout) {
                this.setState({isLoading: false})
                browserHistory.push('/login')
            } else if (user.logout === false){
                this.setState({
                    isLoading: false,
                    message: '退出失败'
                })
                clearTimeout(this.tid)
                this.tid = setTimeout(() => this.setState({message: ''}), 2000)
            }
        })
    }
    hideInfo(e) {
        this.setState({isInfoShow: false})
    }
    handleLogout() {
        this.props.handleLogout()
        this.setState({isLoading: true})
        store.dispatch(clearAuth())
    }
    toggleInfo(e) {
        e.nativeEvent.stopImmediatePropagation()
        try{
            if (e.target.attributes.name.value === 'myAvatar') {
                return
            }
        } catch(e) {}
        this.setState({isInfoShow: !this.state.isInfoShow})
    }
    componentDidMount() {
        document.addEventListener('click', this.hideInfo)
    }
    componentWillUnmount() {
        document.removeEventListener('click',this.hideInfo)
    }
    render() {
        const {firstName, name} = this.props
        const message = this.state.message
        return (
            <div>
                {message && <Pop>{message}</Pop>}
                <SmallAvatar firstName={firstName} small handleClick={this.toggleInfo}>
                    <Info firstName={firstName} 
                        show={this.state.isInfoShow} 
                        name={name}
                        handleLogout = {this.handleLogout}
                        />
                </SmallAvatar>
                <Loading show={this.state.isLoading}>
                    <FullScreenIndicator />
                </Loading>
            </div>
        )
    }
}

const mapState = (state) => ({
    firstName: state.user.name && state.user.name.slice(0,1),
    name: state.user.name
})
const mapDispatch = (dispatch) => ({
    handleLogout() {
        dispatch(removeUser())
    }
})
export default connect(mapState, mapDispatch)(User)