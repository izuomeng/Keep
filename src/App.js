import React, { Component } from 'react'
import './static/css/App.css'
import Header from './components/head'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header>
					Keep
				</Header>
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default App
