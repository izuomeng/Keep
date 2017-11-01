import React, { Component } from 'react'
import './static/css/App.css'
import Header from './components/head'
import SideBar from './components/aside'
import styled from 'styled-components'

const Container = ({className, children}) => (
	<div className={className}>
		{children}
	</div>
)

const StyledContainer = styled(Container)`
	overflow-x: hidden;
	overflow-y: auto;
	padding: 20px;
`
class App extends Component {
	render() {
		return (
			<div className="App">
				<Header>
					Keep
				</Header>
				<SideBar />
				<StyledContainer>
					{this.props.children}
				</StyledContainer>
			</div>
		)
	}
}

export default App
