import React, {Component} from 'react'
import {connect} from 'react-redux'
import Info, {Avatar} from './userInfo'

const SmallAvatar = Avatar.extend`
    margin: 0 10px;
`
class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isInfoShow: false
        }
        this.toggleInfo = this.toggleInfo.bind(this)
        this.hideInfo = this.hideInfo.bind(this)
    }
    hideInfo(e) {
        this.setState({isInfoShow: false})
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
        return (
            <SmallAvatar firstName={firstName} small handleClick={this.toggleInfo}>
                <Info firstName={firstName} show={this.state.isInfoShow} name={name}/>
            </SmallAvatar>
        )
    }
}

const mapState = (state) => ({
    firstName: state.user.name && state.user.name.slice(0,1),
    name: state.user.name
})
export default connect(mapState, null)(User)