import React, {Component} from 'react'
import {FullScreenIndicator} from '../../components'
import store from '../../store'
import {browserHistory} from 'react-router'
import {requestNotes} from '../../store/action/notes'

class Loading extends Component {
    constructor(props) {
        super(props)
        this.go = props.location.query.go
        if (!this.go || this.go === 'loading') {
            this.go = ''
        }
        this.unsubscribe = store.subscribe(() => {
            const user = store.getState()['user']
            if (user.name) {
                browserHistory.push(`/${this.go}`)
            } else if (user.name === null) {
                browserHistory.push('/login')
            }
        })
        store.dispatch(requestNotes('/notes'))
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    render() {
        return (
            <FullScreenIndicator />
        )
    }
}

export default Loading