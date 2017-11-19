import React, {Component} from 'react'
import styled from 'styled-components'
import {EditorState, convertToRaw} from 'draft-js'
import COLOR from '../commen/color'
import Title from './title'
import Text from './text'
import Menus, {CompleteButton} from '../commen/noteBar'
import {addNote} from '@/store/action/notes'
import {connect} from 'react-redux'
import {DoNotUpdate} from '@/lib/highOrderComponents'
import {findDOMNode} from 'react-dom'

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
            height: 134
        }
        this.titleOnChange = this.titleOnChange.bind(this)
        this.textOnChange = this.textOnChange.bind(this)
        this.handleColorChange = this.handleColorChange.bind(this)
        //set upload editorContent
        const titleContent = this.state.titleEditorState.getCurrentContent()
        this.titleContentInJs = convertToRaw(titleContent)
        this.titlePlainText = titleContent.getPlainText()
        const textContent = this.state.textEditorState.getCurrentContent()
        this.textContentInJs = convertToRaw(textContent)
        this.textPlainText = textContent.getPlainText()
    }
    componentDidMount() {
        this.DOMContainer = findDOMNode(this.refs.container)
    }
    titleOnChange(titleEditorState) {
        const prevContent = this.state.titleEditorState.getCurrentContent(),
            nextContent = titleEditorState.getCurrentContent(),
            nextContenInJs = convertToRaw(nextContent)
        this.setState({titleEditorState})
        this.titleContentInJs = nextContenInJs
        this.titlePlainText = nextContent.getPlainText()
        if (nextContent.getPlainText() === prevContent.getPlainText()) {
            return
        }
        // 计算高度
        setTimeout(() => {
            const containerHeight = parseInt(getComputedStyle(this.DOMContainer).height, 10)
            this.note.height = containerHeight
            if (!nextContent.getPlainText()) {
                this.note.height = containerHeight - 38
            }
            if (!this.textPlainText) {
                this.note.height = containerHeight - 46
            }
        }, 0)
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
        this.textPlainText = nextContent.getPlainText()
        if (nextContent.getPlainText() === prevContent.getPlainText()) {
            return
        }
        setTimeout(() => {
            const containerHeight = parseInt(getComputedStyle(this.DOMContainer).height, 10)
            this.note.height = containerHeight
            if (!nextContent.getPlainText()) {
                this.note.height = containerHeight - 46
            }
            if (!this.titlePlainText) {
                this.note.height = containerHeight - 38
            }
        }, 0)
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
    componentWillUnmount() {
        const textContent = this.state.textEditorState.getCurrentContent(),
            titleContent = this.state.titleEditorState.getCurrentContent(),
            addNote = this.props.addNote,
            title = this.titleContentInJs,
            text = this.textContentInJs,
            note = this.note
        requestAnimationFrame(() => {
            if (textContent.getPlainText() || titleContent.getPlainText()) {
                addNote(true, title, text, note)
            }
        })
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
            <Wrapper data-id="newNote" bgColor={this.state.bgColor} ref='container'>
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

const WrappedBeforeClick = DoNotUpdate(BeforeClick)
export {WrappedBeforeClick as BeforeClick}
export default connect(null, mapDispatch)(NewNote)