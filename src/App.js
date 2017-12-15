import React, { Component } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import './static/css/App.css'
import './static/css/Draft.css'
import './static/javascript/color'
import {
	Header,
	Sidebar,
	PopUp,
	FullScreenIndicator as Indicator,
  More,
  AddTag,
  Worker,
  MessageBox,
  EditableCard,
  Reminder
} from './components'
import {minWidthToHideSidebar} from './static/javascript/constants'

const Container = styled.div`
	padding-top: 80px;
	transition: .2s;
	@media (max-width: ${minWidthToHideSidebar}px) {
		padding-left: 20px;
	}
	@media (min-width: ${minWidthToHideSidebar}px) {
		padding-left: ${props => props.sidebar ? '300px' : '20px'};
	}
`
const WrappedContainer = connect(state => ({
	sidebar: state.app.sidebar
}), null)(Container)

const EventProxy = (props) => {
  document.onclick = function(e) {
    props.handlers.forEach(handler => handler.call(null, e))
  }
  return null
}
const ConnectProxy = connect(state => ({
  handlers: state.app.documentClickHandlers
}), null)(EventProxy)

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header>
					<Sidebar />
				</Header>
				<WrappedContainer>
					{this.props.children}
				</WrappedContainer>
				<PopUp />
				<Indicator />
				<More />
        <Reminder />
        <AddTag />
        <Worker />
        <MessageBox />
        <EditableCard />
        <ConnectProxy />
			</div>
		)
	}
}

export default App
