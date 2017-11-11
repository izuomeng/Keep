import React, {Component} from 'react'
import styled from 'styled-components'
import {Editor, EditorState, RichUtils} from 'draft-js'

const Wrapper = styled.div`
    margin-bottom: 20px;
    padding-left: 10px;
    & .public-DraftEditorPlaceholder-root {
        color: rgba(0,0,0,.54);
    }
    & .public-DraftEditorPlaceholder-hasFocus {
        color: rgba(0,0,0,.54);
    }
`

class Text extends Component{
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty()
        }
        this.onChange = (editorState) => this.setState({editorState})
        this.setDomEditorRef = ref => this.domEditor = ref
    }
    componentDidMount(){
        this.domEditor.focus()
    }
    render() {
        return (
            <Wrapper>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    placeholder="添加记事..."
                    ref={this.setDomEditorRef}
                />
            </Wrapper>
        )
    }
}

export default Text