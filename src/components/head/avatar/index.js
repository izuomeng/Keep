import React, { Component } from 'react'
import { connect } from 'react-redux'
import Info, { Avatar } from './userInfo'
import { removeUser } from '@/store/action/user'
import store from '@/store'
import { browserHistory } from 'react-router'
import emitter from '@/lib/events'
import {
  addDocumentClickHandler,
  removeDocumentClickHandler
} from '@/store/action/app'

const SmallAvatar = Avatar.extend`
user-select: none;
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
    const data = e.target.dataset
    if (data.id === 'avatar' || data.name === 'myAvatar') {
      return
    }
    this.setState({ isInfoShow: false })
  }
  handleLogout() {
    this.props.handleLogout()
    emitter.emitEvent('loading')
  }
  toggleInfo(e) {
    if (e.target.dataset.name === 'myAvatar') {
      return
    }
    this.setState({ isInfoShow: !this.state.isInfoShow })
  }
  componentDidMount() {
    this.props.addDocumentClickHandler(this.hideInfo)
  }
  componentWillUnmount() {
    this.props.removeDocumentClickHandler(this.hideInfo)
  }
  render() {
    const { firstName, name } = this.props
    return (
      <SmallAvatar firstName={firstName} small handleClick={this.toggleInfo}>
        <Info firstName={firstName}
          show={this.state.isInfoShow}
          name={name}
          handleLogout={this.handleLogout}
        />
      </SmallAvatar>
    )
  }
}

const mapState = (state) => ({
  firstName: state.user.name && state.user.name.slice(0, 1),
  name: state.user.name,
})
const mapDispatch = {
  handleLogout: removeUser,
  addDocumentClickHandler,
  removeDocumentClickHandler
}
export default connect(mapState, mapDispatch)(User)