import React, {Component} from 'react'
import {Editor, EditorState, RichUtils} from 'draft-js'
import styled from 'styled-components'

const Wrapper = styled.div`
    & .public-DraftEditorPlaceholder-root {
        color: #737373;
    }
    & .public-DraftEditorPlaceholder-hasFocus {
        color: #737373;
    }
    margin-bottom: 20px;
    font-size: 17px;
    font-weight: bold;
    padding-left: 10px;
`

class Title extends Component{
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty()
        }
        this.onChange = (editorState) => this.setState({editorState})
    }
    render() {
        return (
            <Wrapper>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    placeholder="标题"
                />
            </Wrapper>
        )
    }
}

export default Title