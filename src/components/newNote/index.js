import React, {Component} from 'react'
import styled from 'styled-components'
import {EditorState, convertToRaw} from 'draft-js'
import COLOR from '../commen/color'
import Title from './title'
import Text from './text'
import Menus, {CompleteButton} from '../commen/noteBar'
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
    background: ${props => props.bgColor};
`
const MenuWrapper = styled.div`

`
class NewNote extends Component{
    constructor(props) {
        super(props)
        this.state = {
            titleEditorState: EditorState.createEmpty(),
            textEditorState: EditorState.createEmpty(),
            bgColor: COLOR.WHITE,
        }
        this.note = {
            id: Math.random().toString(16).slice(2, 8),
        }
        this.titleOnChange = this.titleOnChange.bind(this)
        this.textOnChange = this.textOnChange.bind(this)
        this.handleDocumentClick = this.handleDocumentClick.bind(this)
        this.handleColorChange = this.handleColorChange.bind(this)
        //set upload editorContent
        const titleContent = this.state.titleEditorState.getCurrentContent()
        this.titleContentInJs = convertToRaw(titleContent)
        const textContent = this.state.textEditorState.getCurrentContent()
        this.textContentInJs = convertToRaw(textContent)
    }
    titleOnChange(titleEditorState) {
        const prevContent = this.state.titleEditorState.getCurrentContent(),
            nextContent = titleEditorState.getCurrentContent(),
            nextContenInJs = convertToRaw(nextContent)
        this.setState({titleEditorState})
        this.titleContentInJs = nextContenInJs
        if (nextContent.getPlainText() === prevContent.getPlainText()) {
            return
        }
        // 函数截流
        clearTimeout(this.tid)
        this.tid = setTimeout(() => {
            this.props.addNote(
                false, 
                nextContenInJs, 
                this.textContentInJs, 
                this.note
            )
        }, 500)
    }
    textOnChange(textEditorState) {
        const prevContent = this.state.textEditorState.getCurrentContent(),
            nextContent = textEditorState.getCurrentContent(),
            nextContentInJs = convertToRaw(nextContent)
        this.setState({textEditorState})
        this.textContentInJs = nextContentInJs
        if (nextContent.getPlainText() === prevContent.getPlainText()) {
            return
        }
        clearTimeout(this.tid)
        this.tid = setTimeout(() => {
            this.props.addNote(
                false, 
                this.titleContentInJs, 
                nextContentInJs, 
                this.note
            )
        }, 500)
    }
    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick)
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick)
        const textContent = this.state.textEditorState.getCurrentContent(),
            titleContent = this.state.titleEditorState.getCurrentContent()
        if (textContent.getPlainText() || titleContent.getPlainText()) {
            this.props.addNote(
                true, 
                this.titleContentInJs, 
                this.textContentInJs, 
                this.note
            )
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
        this.props.hideNewNote()
    }
    handleColorChange(color) {
        this.setState({bgColor: color})
        this.note.bgColor = color
        this.props.addNote(
            false, 
            this.titleContentInJs,
            this.textContentInJs,
            this.note
        )
    }
    render() {
        return (
            <Wrapper data-id="newNote" bgColor={this.state.bgColor}>
                <Title 
                    editorOnChange={this.titleOnChange}
                    editorState={this.state.titleEditorState}
                />
                <Text 
                    editorOnChange={this.textOnChange}
                    editorState={this.state.textEditorState}
                />
                <MenuWrapper data-id="newNote">
                    <CompleteButton value='完成'/>
                    <Menus 
                        onColorClick={this.handleColorChange} 
                        bgColor={this.state.bgColor}
                    />
                </MenuWrapper>
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