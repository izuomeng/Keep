import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Cards, BeforeClick, NewNote} from '@/components'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isBeforeClick: true
        }
        this.handleClick = this.handleClick.bind(this)
        this.hideNewNote = this.hideNewNote.bind(this)
    }
    handleClick() {
        this.setState({isBeforeClick: false})
    }
    hideNewNote() {
        this.setState({isBeforeClick: true})
    }
    render() {
        const {isBeforeClick} = this.state
        return (
            <div>
                {isBeforeClick && <BeforeClick 
                                        onClick={this.handleClick} 
                                        data-id="newNote">
                                        添加记事...
                                  </BeforeClick>}
                {!isBeforeClick && <NewNote hideNewNote={this.hideNewNote}/>}
                <Cards notes={this.props.notes} />
            </div>
        )
    }
}

const mapState = (state) => ({
    notes: state.notes
})

export default connect(mapState, null)(Home)