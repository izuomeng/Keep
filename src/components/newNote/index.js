import React, {Component} from 'react'
import styled from 'styled-components'
import {EditorState, convertToRaw} from 'draft-js'
import COLOR from '../../static/javascript/color'
import Title from './title'
import Text from './text'
import Menus from './menus'
import {addNote} from '../../store/action/notes'
import {connect} from 'react-redux'

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
        this.id = Math.random().toString(16).slice(2, 8)
        this.titleOnChange = this.titleOnChange.bind(this)
        this.textOnChange = this.textOnChange.bind(this)
        this.handleDocumentClick = this.handleDocumentClick.bind(this)
    }
    titleOnChange(titleEditorState) {
        const prevContent = this.state.titleEditorState.getCurrentContent(),
            nextContent = titleEditorState.getCurrentContent(),
            nextContenInJs = convertToRaw(nextContent)
        this.setState({titleEditorState})
        if (nextContent.getPlainText() === prevContent.getPlainText()) {
            return
        }
        const textContent = this.state.textEditorState.getCurrentContent(),
            textContentInJs = convertToRaw(textContent)
        // 函数截流
        clearTimeout(this.tid)
        this.tid = setTimeout(() => {
            this.props.addNote(false, nextContenInJs, textContentInJs, {id: this.id})
        }, 500)
    }
    textOnChange(textEditorState) {
        const prevContent = this.state.textEditorState.getCurrentContent(),
            nextContent = textEditorState.getCurrentContent(),
            nextContentInJs = convertToRaw(nextContent)
        this.setState({textEditorState})
        if (nextContent.getPlainText() === prevContent.getPlainText()) {
            return
        }
        const titleContent = this.state.titleEditorState.getCurrentContent(),
            titleContentInJs = convertToRaw(titleContent)
        clearTimeout(this.tid)
        this.tid = setTimeout(() => {
            this.props.addNote(false, titleContentInJs, nextContentInJs, {id: this.id})
        }, 500)
    }
    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick)
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick)
        const titleContent = this.state.titleEditorState.getCurrentContent(),
        titleContentInJs = convertToRaw(titleContent)
        const textContent = this.state.textEditorState.getCurrentContent(),
            textContentInJs = convertToRaw(textContent)
        if (textContent.getPlainText() || titleContent.getPlainText()) {
            this.props.addNote(true, titleContentInJs, textContentInJs, {id: this.id})
        }
    }
    handleDocumentClick(e) {
        if (e.target.dataset.id === 'newNote') {
            return
        } else if (e.target.className.indexOf('DraftStyleDefault') > -1) {
            return
        } else if (e.target.dataset.text) {
            return
        }
        console.log(e.target)
        this.props.hideNewNote()
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

const mapDispatch = (dispatch) => ({
    addNote(updateState, title, text, other) {
        dispatch(addNote(updateState, title, text, other))
    }
})

export {BeforeClick}
export default connect(null, mapDispatch)(NewNote)