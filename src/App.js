import React, { Component } from 'react'
import './static/css/App.css'
import Header from './components/head'
import SideBar from './components/aside'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header>
					Keep
				</Header>
				<SideBar />
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default App
