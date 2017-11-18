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
        this.handleDocumentClick = this.handleDocumentClick.bind(this)
    }
    handleClick() {
        if (!this.state.isBeforeClick) {
            return
        }
        this.setState({isBeforeClick: false})
    }
    handleDocumentClick(e) {
        if (this.state.isBeforeClick) {
            return
        }
        if (e.target.dataset.id === 'newNote') {
            return
        } else if (e.target.className.indexOf('DraftStyleDefault') > -1) {
            return
        } else if (e.target.dataset.text) {
            return
        }
        this.setState({isBeforeClick: true})
    }
    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick)
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick)
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
                {!isBeforeClick && <NewNote />}
                <Cards notes={this.props.notes} />
            </div>
        )
    }
}

const mapState = (state) => ({
    notes: state.notes
})

export default connect(mapState, null)(Home)