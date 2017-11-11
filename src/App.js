import React, { Component } from 'react'
import './static/css/App.css'
import './static/css/Draft.css'
import {Header, Sidebar} from './components'
import styled from 'styled-components'
import {FullScreenIndicator as Indicator} from './components'
import {PopUp} from './components'

const Container = ({className, children}) => (
	<div className={className}>
		{children}
	</div>
)

const StyledContainer = styled(Container)`
	height: calc(100vh - 64px);
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
				<Sidebar />
				<StyledContainer>
					{this.props.children}
				</StyledContainer>
				<PopUp />
				<Indicator />
			</div>
		)
	}
}

export default App
