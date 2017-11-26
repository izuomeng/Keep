import React, { Component } from 'react'
import {Cards} from '@/components'
import {connect} from 'react-redux'
import styled from 'styled-components'
import COLOR from '@/static/javascript/color'

const Container = styled.div`

`
const Title = styled.div`
    text-align: center;
    padding: 10px 0 30px 0;
    color: ${COLOR.SIDEBAR_TEXT}
`
class Trash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            asyncRender: false
        }
    }
    componentDidMount() {
        setTimeout(() => this.setState({asyncRender: true}))
    }
    render() {
        return (
            <Container>
                <Title>回收站</Title>
                {this.state.asyncRender && <Cards notes={this.props.notes} />}
            </Container>
        )
    }
}

const mapState = (state) => ({
    notes: state.notes.filter((v) => v.deleteTime)
})

export default connect(mapState, null)(Trash)