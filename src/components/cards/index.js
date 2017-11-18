import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import WaterFall from '../commen/waterfall'

const Container = styled.div`
    margin-top: 40px;
`

class Cards extends Component {
    static propTypes = {
        notes: PropTypes.array
    }
    static defaultProps = {
        notes: [{}]
    }
    constructor(props) {
        super(props)
        this.state = {
            notes: this.props.notes
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({notes: nextProps.notes})
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.notes.length === this.state.notes.length) {
            return false
        }
        return true
    }
    render() {
        const {notes} = this.state
        return (
            <Container>
                <WaterFall 
                    spacing={20}
                    notes={notes}
                />
            </Container>
        )
    }
}

export default Cards