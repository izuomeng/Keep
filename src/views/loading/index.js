import React, {Component} from 'react'
import {NoStateIndicator as Indicator} from '@/components'
import store from '@/store'
import {browserHistory} from 'react-router'
import {requestNotes} from '@/store/action/notes'

class Loading extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
        this.go = props.location.query.go
        if (!this.go || this.go === 'loading') {
            this.go = ''
        }
        this.unsubscribe = store.subscribe(() => {
            const user = store.getState()['user']
            const popInfo = store.getState()['popInfo']
            if (user.name) {
                browserHistory.push(`/${this.go}`)
            } else if (user.name === null) {
                browserHistory.push('/login')
            }
            if (popInfo.type === 'error') {
                this.setState({show: false})
            }
        })
        store.dispatch(requestNotes('/notes'))
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    render() {
        return (
            <Indicator show={this.state.show}/>
        )
    }
}

export default Loading