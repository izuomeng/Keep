import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
    width: 240px;
    background: 'white';
    padding: 10px 0;
`

class Card extends Component {
    static propTypes = {
        note: PropTypes.object
    }
    static defaultProps = {
        note: {}
    }
    constructor(props) {
        super(props)
        this.state = {
            note: this.props.note
        }
    }
    render() {
        return (
            <Wrapper>
                
            </Wrapper>
        )
    }
}
