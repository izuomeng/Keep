import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import Quill from 'quill'
import PropTypes from 'prop-types'

class Editor extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    theme: PropTypes.string,
    readOnly: PropTypes.bool,
    content: PropTypes.object,
    getInstence: PropTypes.func,
    autofocus: PropTypes.bool
  }
  static defaultProps = {
    theme: 'bubble',
    placeholder: '',
    readOnly: false,
    onChange: () => null,
    getInstence: () => null
  }
  constructor(props) {
    super(props)
    this.options = {
      theme: this.props.theme,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly
    }
    this.onChange = this.onChange.bind(this)
    this.getRef = this.getRef.bind(this)
  }
  onChange(delta, prevdelta, source) {
    if (source === 'user') {
      const content = this.Editor.getContents(),
        text = this.Editor.getText()
      this.props.onChange(content, text)
    }
  }
  getRef(ref) {
    this.div = findDOMNode(ref)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.content && this.Editor) {
      this.Editor.setContents(nextProps.content)
      if (nextProps.inEditable) {
        this.focusEnd()
        this.componentWillReceiveProps = null
      }
    }
  }
  focusEnd() {
    const len = this.Editor.getLength() - 1
    this.Editor.setSelection(len, 0)
  }
  componentDidMount() {
    this.Editor = new Quill(this.div, this.options)
    this.Editor.on('text-change', this.onChange)
    const {content, autofocus} = this.props
    if (content) {
      this.Editor.setContents(content)
    }
    if (autofocus) {
      this.Editor.focus()
    }
    this.props.getInstence(this.Editor)
  }
  componentWillUnmount() {
    this.Editor.off('text-change', this.onChange)
  }
  render() {
    return (
      <div ref={this.getRef}></div>
    )
  }
}

export default Editor
// export default () => 1234567890