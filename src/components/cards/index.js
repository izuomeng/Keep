import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Card from './card'
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
    render() {
        const {notes} = this.props
        return (
            <Container>
                <WaterFall 
                    waterDrops={notes.map((note) => (
                        <Card note={note} key={note.id} mykey={note.id}/>
                    ))}
                    spacing={20}
                />
            </Container>
        )
    }
}

export default Cards