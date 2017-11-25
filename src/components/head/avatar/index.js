import React, {Component} from 'react'
import {connect} from 'react-redux'
import Info, {Avatar} from './userInfo'
import {removeUser} from '@/store/action/user'
import store from '@/store'
import {browserHistory} from 'react-router'
import Pop from '../../popup'
import emitter from '@/lib/events'

const SmallAvatar = Avatar.extend`
    margin: 0 10px;
`
class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isInfoShow: false,
        }
        this.toggleInfo = this.toggleInfo.bind(this)
        this.hideInfo = this.hideInfo.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.unsubscribe = store.subscribe(() => {
            const user = store.getState()['user']
            if (user.logout === true) {
                emitter.emitEvent('stopLoading')
                browserHistory.push('/login')
            } else if (user.logout === false) {
                emitter.emitEvent('stopLoading')
            }
        })
    }
    hideInfo(e) {
        if (!this.state.isInfoShow) {
            return
        }
        this.setState({isInfoShow: false})
    }
    handleLogout() {
        this.props.handleLogout()
        emitter.emitEvent('loading')
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
        const {message, isPopShow} = this.state
        return (
            <div>
                <Pop show={isPopShow}>{message}</Pop>
                <SmallAvatar firstName={firstName} small handleClick={this.toggleInfo}>
                    <Info firstName={firstName} 
                        show={this.state.isInfoShow} 
                        name={name}
                        handleLogout = {this.handleLogout}
                    />
                </SmallAvatar>
            </div>
        )
    }
}

const mapState = (state) => ({
    firstName: state.user.name && state.user.name.slice(0,1),
    name: state.user.name,
})
const mapDispatch = (dispatch) => ({
    handleLogout() {
        dispatch(removeUser())
    }
})
export default connect(mapState, mapDispatch)(User)