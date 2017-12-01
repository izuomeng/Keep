import React, { Component } from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Cards, BeforeClick, NewNote} from '@/components'

const CardsConntainer = styled.div`
    margin-top: 40px;
`
const Container = styled.div`

`
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isBeforeClick: true,
            asyncRender: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleDocumentClick = this.handleDocumentClick.bind(this)
        this.hideEditor = this.hideEditor.bind(this)
    }
    handleClick() {
        if (!this.state.isBeforeClick) {
            return
        }
        this.setState({isBeforeClick: false})
    }
    handleDocumentClick(e) {
        const data = e.target.dataset
        if (this.state.isBeforeClick) {
            return
        }
        if (data.id === 'newNote') {
            return
        } else if (e.target.className.indexOf('DraftStyleDefault') > -1) {
            return
        } else if (data.text) {
            return
        } else if (data.id === 'addNewTag') {
          return
        }
        this.setState({isBeforeClick: true})
    }
    hideEditor() {
        this.setState({isBeforeClick: true})
    }
    componentDidMount() {
        setTimeout(() => this.setState({asyncRender: true}), 0)
        document.addEventListener('click', this.handleDocumentClick)
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick)
    }
    render() {
        const {isBeforeClick} = this.state
        const {notes} = this.props,
            fixedNotes = notes.filter(v => v.isFixed),
            hasFixedNote = fixedNotes.length > 0 ? true : false,
            label = hasFixedNote ? '其他' : '',
            otherNotes = notes.filter(v => !v.isFixed)
        return (
            <Container>
                {isBeforeClick && 
                <BeforeClick 
                    onClick={this.handleClick} 
                    data-id="newNote">
                    添加记事...
                </BeforeClick>}
                {!isBeforeClick && 
                <NewNote hideEditor={this.hideEditor} />}
                {this.state.asyncRender && 
                <CardsConntainer>
                    {hasFixedNote && 
                    <Cards notes={fixedNotes} label='已固定的记事'/>}
                    <Cards notes={otherNotes} label={label}/>
                </CardsConntainer>}
            </Container>
        )
    }
}

const mapState = (state) => ({
    notes: state.notes.filter((v) => !v.isArchived && !v.deleteTime)
})

export default connect(mapState, null)(Home)