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

export const AddProps = (MyComponent) => (newProps) =>
  class extends Component {
    render() {
      return <MyComponent {...this.props} {...newProps}/>
    }
  }