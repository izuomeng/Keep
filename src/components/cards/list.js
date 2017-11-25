import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card from './card'
import shouldUpdate from '@/lib/shouldUpdate'

const Container = styled.div`

`
const CardWrapper = styled.div`
  max-width: 600px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
`
class List extends Component {
  static propTypes = {
    notes: PropTypes.array.isRequired
  }
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = shouldUpdate.bind(this)
  }
  render() {
    const {notes} = this.props
    return (
      <Container>
        {notes.map((v) => (
          <CardWrapper key={v.id}>
            <Card note={v} isList/>
          </CardWrapper>
        ))}
      </Container>
    )
  }
}

export default List