import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Card from './card'

const List = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    cursor: default;
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
    render() {
        const {notes} = this.props
        return (
            <List>
                {notes.map((note) => (
                    <Card note={note} key={note.id} />
                ))}
            </List>
        )
    }
}

export default Cards