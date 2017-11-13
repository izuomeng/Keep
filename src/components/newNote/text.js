import React, {Component} from 'react'
import styled from 'styled-components'
import {Editor, RichUtils} from 'draft-js'

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
        this.setDomEditorRef = ref => this.domEditor = ref
        this.handleKeyCommand = this.handleKeyCommand.bind(this)
    }
    componentDidMount(){
        this.domEditor.focus()
    }
    handleKeyCommand(command, editorState) {
		const newState = RichUtils.handleKeyCommand(editorState, command)
		if (newState) {
			this.props.editorOnChange(newState)
			return true
		}
		return false
	}
    render() {
        const {editorState, editorOnChange} = this.props
        return (
            <Wrapper>
                <Editor
                    editorState={editorState}
                    onChange={editorOnChange}
                    placeholder="添加记事..."
                    ref={this.setDomEditorRef}
                    handleKeyCommand={this.handleKeyCommand}
                    spellCheck
                />
            </Wrapper>
        )
    }
}

export default Text