import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card from './card'
import COLOR from '../commen/color'
import shouldUpdate from '@/lib/shouldUpdate'

const Container = styled.div`

`
const CardWrapper = styled.div`
  max-width: 600px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
`
const Label = CardWrapper.extend`
  font-size: 14px;
  font-weight: bold;
  color: ${COLOR.FIX_STATUS};
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
    const {notes, label} = this.props
    return (
      <Container>
        {label && 
        <Label>
          {label}
        </Label>}
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