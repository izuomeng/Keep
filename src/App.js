import React, { Component } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import './static/css/App.css'
import './static/css/Draft.css'
import {
	Header,
	Sidebar,
	PopUp,
	FullScreenIndicator as Indicator,
	More
} from './components'

const Container = styled.div`
	padding-left: ${props => props.sidebar ? '300px' : '20px'};
	padding-top: 80px;
	transition: .2s;
`
const mapState = (state) => ({
	sidebar: state.app.sidebar
})
const WrappedContainer = connect(mapState, null)(Container)

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
			</div>
		)
	}
}

export default App
