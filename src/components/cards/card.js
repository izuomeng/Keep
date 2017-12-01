import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Editor, convertFromRaw, EditorState} from 'draft-js'
import {connect} from 'react-redux'
import {editNote, postEditNote} from '@/store/action/notes'
import event from '@/lib/events'
import Menus from '../commen/noteBar'
import FixIcon from '../commen/icons/fix'
import SelectIcon from '../commen/icons/select'
import Tag from '../commen/lable/tags'
import shouldUpdate from '@/lib/shouldUpdate'

const Wrapper = styled.div`
    user-select: none;
    cursor: default;
    position: relative;
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
    &:hover #fixIcon {
        opacity: 1;
    }
    &:hover #selectIcon {
        opacity: 1;
    }
`
const Title = styled.div`
    font-weight: bold;  
    font-size: 17px;
    line-height: 23px;
    min-height: 38px;
    padding: 4px 15px 15px 15px;
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
    opacity: ${props => props.isMoreShow ? 1 : 0};
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
            bgColor: note.bgColor || '#FAFAFA',
            asyncRender: false,
            isMoreShow: false
        }
        this.id = note.id
        this.titleOnChange = (titleEditor) => this.setState({titleEditor})
        this.textOnChange = (textEditor) => this.setState({textEditor})
        this.dispatchNewNote = this.dispatchNewNote.bind(this)
        this.onColorClick = this.onColorClick.bind(this)
        this.onArchiveClick = this.onArchiveClick.bind(this)
        this.onMoreClick = this.onMoreClick.bind(this)
        this.hideMore = () => this.setState({isMoreShow: false})
        this.shouldComponentUpdate = shouldUpdate.bind(this)
        const handleDelete = this.onDelete.bind(this)
        this.moreClickHandlers = {
            handleDelete
        }
    }
    componentWillReceiveProps(nextProp) {
      this.setState({note: nextProp.note})
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
        const {note} = this.state
        const newNote = {...note, bgColor: color}
        this.setState({bgColor: color, note: newNote})
        this.dispatchNewNote(newNote)
    }
    onArchiveClick() {
        if (this.state.note.deleteTime) {
            return
        }
        const {note} = this.state
        const newNote = {...note, isArchived: !note.isArchived}
        this.dispatchNewNote(newNote)
    }
    onMoreClick(pos) {
        event.emitEvent('moreClick', pos, this.hideMore, this.moreClickHandlers)
        this.setState({isMoreShow: true})
    }
    onFixClick() {
        const {note} = this.state
        if (note.isArchived || note.deleteTime) {
            return
        }
        const newNote = {...note, isFixed: !note.isFixed}
        this.dispatchNewNote(newNote)
    }
    onDelete() {
        if (this.state.note.deleteTime) {
            return
        }
        const deleteTime = new Date()
        const {note} = this.state
        const newNote = {...note, deleteTime}
        this.dispatchNewNote(newNote)
    }
    componentDidMount() {
        setTimeout(() => this.setState({asyncRender: true}), 0)
    }
    render() {
        const {titleEditor, textEditor, isMoreShow, note, bgColor} = this.state
        const titleText = titleEditor.getCurrentContent().getPlainText(),
            bodyText = textEditor.getCurrentContent().getPlainText()
        const lable = note.isFixed ? '取消固定' : '固定记事'
        return (
            <Wrapper 
                bgColor={bgColor} 
                data-key={this.props.mykey}
                isList={this.props.isList}
            >
                <SelectIcon handleClick={()=>console.log('select clicked')} />
                <FixIcon handleClick={::this.onFixClick} lable={lable}/>
                {titleText &&
                <Title>
                    <Editor 
                        editorState={titleEditor} 
                        onChange={this.titleOnChange}
                        readOnly
                    />
                </Title>}
                {bodyText && 
                <Body>
                    <Editor 
                        editorState={textEditor} 
                        onChange={this.textOnChange}
                        readOnly
                    />
                </Body>}
                {note.lable.map(v => (
                  <Tag key={v.text}>{v.text}</Tag>
                ))}
                <MenuContainer isMoreShow={isMoreShow}>
                {this.state.asyncRender && 
                <Menus 
                    isInCard 
                    bgColor={bgColor} 
                    onColorClick={this.onColorClick}
                    onArchiveClick={this.onArchiveClick}
                    onMoreClick={this.onMoreClick}
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
