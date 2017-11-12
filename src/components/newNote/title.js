import React, {Component} from 'react'
import {Editor} from 'draft-js'
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
    render() {
        const {editorState, editorOnChange} = this.props
        return (
            <Wrapper>
                <Editor
                    editorState={editorState}
                    onChange={editorOnChange}
                    placeholder="标题"
                />
            </Wrapper>
        )
    }
}

export default Title