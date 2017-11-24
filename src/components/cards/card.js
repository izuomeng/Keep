import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Editor, convertFromRaw, EditorState} from 'draft-js'
import Menus from '../commen/noteBar'
import {connect} from 'react-redux'
import {editNote, postEditNote} from '@/store/action/notes'

const Wrapper = styled.div`
    width: ${props => props.isList ? '' : '240px'};
    background: ${props => props.bgColor};
    padding: 10px 0;
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
    height: 30px;
`
class Card extends Component {
    static propTypes = {
        note: PropTypes.object.isRequired
    }
    static defaultProps = {
        isList: false
    }
    constructor(props) {
        super(props)
        const {note} = this.props
        const titleBlocksFromRaw = convertFromRaw(note.title),
            textBlocksFromRaw = convertFromRaw(note.text)
        this.state = {
            titleEditor: EditorState.createWithContent(titleBlocksFromRaw),
            textEditor: EditorState.createWithContent(textBlocksFromRaw),
            note,
            bgColor: note.bgColor,
            asyncRender: false
        }
        this.id = note.id
        this.titleOnChange = (titleEditor) => this.setState({titleEditor})
        this.textOnChange = (textEditor) => this.setState({textEditor})
        this.dispatchNewNote = this.dispatchNewNote.bind(this)
        this.onColorClick = this.onColorClick.bind(this)
        this.onArchiveClick = this.onArchiveClick.bind(this)
    }
    dispatchNewNote(newNote) {
        this.props.editNote(newNote)
        clearTimeout(this.tid)
        this.tid = setTimeout(() => this.props.postEditnote(newNote), 200)
    }
    onColorClick(color) {
        if (color === this.state.bgColor) {
            return
        }
        const newNote = {...this.state.note, bgColor: color}
        this.setState({bgColor: color, note: newNote})
        this.dispatchNewNote(newNote)
    }
    onArchiveClick() {
        const {isArchived} = this.state.note
        const newNote = {...this.state.note, isArchived: !isArchived}
        this.dispatchNewNote(newNote)
    }
    componentDidMount() {
        console.log('mount')
        setTimeout(() => this.setState({asyncRender: true}), 0)
    }
    render() {
        const {titleEditor, textEditor} = this.state
        const titleText = titleEditor.getCurrentContent().getPlainText(),
            bodyText = textEditor.getCurrentContent().getPlainText()
        return (
            <Wrapper 
                bgColor={this.state.bgColor} 
                data-key={this.props.mykey}
                isList={this.props.isList}
            >
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
                {this.state.asyncRender && <Menus 
                        isInCard 
                        bgColor={this.state.bgColor} 
                        onColorClick={this.onColorClick}
                        onArchiveClick={this.onArchiveClick}
                    />}
                </MenuContainer>
            </Wrapper>
        )
    }
}

const mapDispatch = (dispatch) => ({
    editNote(newNote) {
        dispatch(editNote(newNote))
    },
    postEditnote(newNote) {
        dispatch(postEditNote(newNote))
    }
})

export default connect(null, mapDispatch)(Card)
