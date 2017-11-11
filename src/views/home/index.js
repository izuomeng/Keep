import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Cards, BeforeClick, NewNote} from '../../components'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isBeforeClick: true
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleDocumentClick = this.handleDocumentClick.bind(this)
    }
    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick)
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick)
    }
    handleClick() {
        this.setState({isBeforeClick: false})
    }
    handleDocumentClick(e) {
        if (e.target.dataset.id === 'newNote') {
            return
        } else if (e.target.className.indexOf('DraftStyleDefault') > -1) {
            return
        }
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