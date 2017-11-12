import React, {Component} from 'react'
import styled from 'styled-components'
import {EditorState} from 'draft-js'
import COLOR from '../../static/javascript/color'
import Title from './title'
import Text from './text'
import Menus from './menus'

const BeforeClick = styled.div`
    max-width: 600px;
    margin: 10px auto;
    background: ${COLOR.CARD_BACK};
    font-size: 14px;
    line-height: 19px;
    min-height: 46px;
    padding: 12px 15px 15px 15px;
    color: rgba(0,0,0,.54);
    box-shadow: 0 2px 3px darkgrey;
    border-radius: 2px;
    cursor: text;
`
const Wrapper = BeforeClick.extend`
    padding-left: 5px;
    border-radius: 2px;
    color: black;
`

class NewNote extends Component{
    constructor(props) {
        super(props)
        this.state = {
            titleEditorState: EditorState.createEmpty(),
            textEditorState: EditorState.createEmpty()
        }
        this.id = Math.random().toString(16).slice(2,8)
        this.titleOnChange = titleEditorState => this.setState({titleEditorState})
        this.textOnChange = textEditorState => this.setState({textEditorState})
    }
    render() {
        return (
            <Wrapper data-id="newNote">
                <Title 
                    editorOnChange={this.titleOnChange}
                    editorState={this.state.titleEditorState}
                />
                <Text 
                    editorOnChange={this.textOnChange}
                    editorState={this.state.textEditorState}
                />
                <Menus />
            </Wrapper>
        )
    }
}
export {BeforeClick}
export default NewNote