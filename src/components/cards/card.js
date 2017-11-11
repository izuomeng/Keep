import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import COLOR from '../../static/javascript/color'

const Wrapper = styled.div`
    width: 240px;
    background: ${COLOR.CARD_BACK};
    padding: 10px 0;
    margin: 10px;
    box-sizing: border-box;
    box-shadow: 0 1px 3px darkgrey,
                0 2px 2px darkgrey;
    transition: .2s;
    border-radius: 2px;
    &:hover{
        box-shadow: 0 0 15px 0 darkgrey;
    }
`
const Title = styled.div`
    font-weight: bold;
    font-size: 17px;
    line-height: 23px;
    min-height: 38px;
    padding: 15px 15px 0 15px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: 'Roboto Condensed',arial,sans-serif;
`
const Body = styled.div`
    font-size: 14px;
    line-height: 19px;
    min-height: 30px;
    padding: 12px 15px 15px 15px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: 'Roboto Slab','Times New Roman',serif;
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
        const {title, text} = this.props.note
        return (
            <Wrapper>
                <Title>{title}</Title>
                <Body>{text}</Body>
            </Wrapper>
        )
    }
}
export default Card
