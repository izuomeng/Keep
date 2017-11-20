import React, { Component } from 'react'
import './static/css/App.css'
import './static/css/Draft.css'
import {Header, Sidebar} from './components'
import styled from 'styled-components'
import {FullScreenIndicator as Indicator} from './components'
import {PopUp} from './components'

const Container = styled.div`
	display: flex;
`
const Main = styled.div`
	height: calc(100vh - 64px);
	overflow-y: scroll;
	padding: 20px;
	flex: 1;
`

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header>
					Keep
				</Header>
				<Container>
					<Sidebar />
					<Main>
						{this.props.children}
					</Main>
				</Container>
				<PopUp />
				<Indicator />
			</div>
		)
	}
}

export default App
