import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Editor, convertFromRaw, EditorState} from 'draft-js'
import Menus from '../commen/noteBar'

const Wrapper = styled.div`
    width: 240px;
    background: ${props => props.bgColor};
    padding: 10px 0;
    margin: 10px;
    box-sizing: border-box;
    box-shadow: 0 1px 3px darkgrey,
                0 2px 2px darkgrey;
    transition: .2s;
    border-radius: 2px;
    &:hover {
        box-shadow: 0 0 15px 0 darkgrey,
                    0 2px 5px 0 darkgrey
    }
    &:hover #MenuContainer {
        opacity: 1;
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
const MenuContainer = styled.div.attrs({
    id: 'MenuContainer'
})`
    padding: 0 10px;
    transition: .3s;
    opacity: 0;
`
class Card extends Component {
    static propTypes = {
        note: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props)
        const {note} = this.props
        const titleBlocksFromRaw = convertFromRaw(note.title),
            textBlocksFromRaw = convertFromRaw(note.text)
        this.state = {
            titleEditor: EditorState.createWithContent(titleBlocksFromRaw),
            textEditor: EditorState.createWithContent(textBlocksFromRaw),
            bgColor: note.bgColor
        }
        this.id = note.id
        this.titleOnChange = (titleEditor) => this.setState({titleEditor})
        this.textOnChange = (textEditor) => this.setState({textEditor})
        this.onColorClick = this.onColorClick.bind(this)
    }
    onColorClick(color) {
        this.setState({bgColor: color})
    }
    render() {
        const {titleEditor, textEditor} = this.state
        const titleText = titleEditor.getCurrentContent().getPlainText(),
            bodyText = textEditor.getCurrentContent().getPlainText()
        return (
            <Wrapper bgColor={this.state.bgColor}>
                {titleText &&
                <Title>
                    <Editor 
                        editorState={this.state.titleEditor} 
                        onChange={this.titleOnChange}
                        readOnly
                    />
                </Title>}
                {bodyText && 
                <Body>
                    <Editor 
                        editorState={this.state.textEditor} 
                        onChange={this.textOnChange}
                        readOnly
                    />
                </Body>}
                <MenuContainer>
                    <Menus 
                        isInCard 
                        bgColor={this.state.bgColor} 
                        onColorClick={this.onColorClick}
                    />
                </MenuContainer>
            </Wrapper>
        )
    }
}
export default Card
