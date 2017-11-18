import React, {Component} from 'react'

export const DoNotUpdate = (MyComponent) => 
  class extends Component {
    shouldComponentUpdate() {
      return false
    }
    render() {
      return <MyComponent {...this.props}/>
    }
  }