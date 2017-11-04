import React, {Component} from 'react'
import {Indicator} from '../../components'
import styled from 'styled-components'
import store from '../../store'
import {browserHistory} from 'react-router'
import {requestNotes} from '../../store/action/notes'

const Container = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(232,232,232,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
`

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
            <Container>
                <Indicator size='middle' color='orange'>加载中...</Indicator>
            </Container>
        )
    }
}

export default Loading