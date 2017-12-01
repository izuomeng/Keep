import React, {Component} from 'react'
import styled from 'styled-components'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {TextButton} from '../commen/button'
import IconWithLable from '../commen/icons/base'
import {editLable} from '@/store/action/app'

const Back = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.6);
  z-index: 999;
  vertical-align: middle;
`

const Main = styled.div`
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  width: 300px;
  background: rgb(255, 255, 255);
  box-shadow: 0 3px 5px rgba(0,0,0,0.5);
  line-height: normal;
`
const Top = styled.div`
  padding: 15px;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  & .tagIcon {
    color: #767676;
    cursor: pointer;
  }
  & .tagIcon:hover {
    color: black;
  }
`
const Bottom = styled.div`
  border: 1px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.08);
  padding: 15px 10px;
  text-align: right;
`
const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: left;
`
const Item = styled.div`
  display: flex;
  height: 45px;
  align-items: center;
  margin: 0 10px;
  z-index: 9999;
  & input:focus {
    border-bottom-width: .5px;
  }
  & #deleteTagIcon {
    display: none;
  }
  & #okTagIcon {
    display: none;
  }
  &:hover #deleteTagIcon {
    display: block;
  }
  &:hover #tagIcon {
    display: none;
  }
  & input:focus ~#okTagIcon {
    display: block;
  }
  & input:focus ~#editTagIcon {
    display: none;
  }
`
const Input = styled.input`
  border: 0px solid rgba(0,0,0,0.2);
  background-color: transparent;
  flex: 1 1 auto;
  font-size: 14px;
  font-weight: 500;
  margin: 0 15px;
  line-height: 25px;
`
const Exsist = styled.div`
  color: #d50000;
  cursor: default;
  font-size: smaller;
  font-style: italic;
  padding: 10px;
`
const IconWithClass = ({className, icon, lable, handleClick}) => (
  <div className={className}>
    <IconWithLable icon={icon} lable={lable} handleClick={handleClick}/>
  </div>
)

class EditTag extends Component {
  constructor(props) {
    super(props)
    const inputEditTags = this.props.tags.map(v => v.text)
    this.state = {
      inputNewTag: '',
      inputEditTags: inputEditTags,
      isRepeat: false
    }
    this.inputs = []
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }
  componentWillReceiveProps(nextProp) {
    this.setState({inputEditTags: nextProp.tags.map(v => v.text)})
  }
  onInputNewTag(e) {
    this.setState({inputNewTag: e.target.value})
  }
  onInputEditTag(index) {
    return (e) => {
      const myNewTags = this.state.inputEditTags.map((v, i) => {
        if (i === index) {
          return e.target.value
        }
        return v
      })
      this.setState({inputEditTags: myNewTags})
    }
  }
  onInputEditTagBlur() {
    const prevTags = this.props.tags.map(v => v.text)
    const newTags = this.state.inputEditTags.filter(v => v)
    newTags.forEach((v, i) => {
      if (v !== prevTags[i]) {
        this.props.editLable(newTags.map(v => ({text: v})))
      }
    })
  }
  onOkClick() {
    const {tags, editLable} = this.props
    const newTag = this.state.inputNewTag.trim()
    if (tags.findIndex(v => v.text === newTag) > -1) {
      this.setState({isRepeat: true})
    } else if (!newTag) {
      return
    } else {
      this.setState({isRepeat: false, inputNewTag: ''})
      const newTags = [{text: newTag}, ...tags]
      editLable(newTags)
    }
  }
  onCancelClick() {
    this.setState({inputNewTag: '', isRepeat: false})
  }
  onDeleteClick(tagText) {
    const {tags, editLable} = this.props
    const newTags = tags.filter(v => v.text !== tagText)
    editLable(newTags)
  }
  onEditClick(index) {
    return () => {
      const inputDOM = findDOMNode(this.inputs[index])
      inputDOM.focus()
      inputDOM.select()
    }
  }
  bindInput(ref) {
    this.inputs.push(ref)
  }
  render() {
    const {onBackClick, tags} = this.props
    const {inputNewTag, isRepeat, inputEditTags} = this.state
    return (
      <Back onClick={onBackClick} data-id='editTagBack'>
        <Main>
          <Top>
            <Title>修改标签</Title>
            <Item>
              <IconWithClass
                icon='glyphicon glyphicon-remove'
                lable='取消'
                className='tagIcon'
                handleClick={::this.onCancelClick}
              />
              <Input
                autoFocus
                value={inputNewTag}
                placeholder='创建新标签'
                onChange={::this.onInputNewTag}
              />
              <IconWithClass 
                icon='glyphicon glyphicon-ok'
                lable='创建标签'
                className='tagIcon'
                handleClick={::this.onOkClick}
              />
            </Item>
            {isRepeat && <Exsist>该标签已存在</Exsist>}
            {tags.map((v, i) => (
              <Item key={v.text}>
                <div id='tagIcon'>
                  <IconWithClass
                    icon='glyphicon glyphicon-tag'
                    lable='删除标签'
                    className='tagIcon'
                  />
                </div>
                <div id='deleteTagIcon'>
                  <IconWithClass
                    icon='glyphicon glyphicon-trash'
                    lable='删除标签'
                    className='tagIcon'
                    handleClick={() => {this.onDeleteClick(v.text)}}
                  />
                </div>
                <Input
                  value={inputEditTags[i]}
                  ref={::this.bindInput}
                  onChange={::this.onInputEditTag(i)}
                  onBlur={::this.onInputEditTagBlur}
                />
                <div id='editTagIcon' onClick={this.onEditClick(i)}>
                  <IconWithClass
                    icon='glyphicon glyphicon-pencil'
                    lable='重命名标签'
                    className='tagIcon'
                  />
                </div>
                <div id='okTagIcon'>
                  <IconWithClass
                    icon='glyphicon glyphicon-ok'
                    lable='重命名标签'
                    className='tagIcon'
                  />
                </div>
              </Item>
            ))}
          </Top>
          <Bottom>
            <TextButton value='完成' data-id='editTagBack' />
          </Bottom>
        </Main>
      </Back>
    )
  }
}
const mapDispatch = {
  editLable
}
export default connect(null, mapDispatch)(EditTag)