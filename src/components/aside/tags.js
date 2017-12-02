import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'
import Item from './item'
import {Link} from 'react-router'
import {TextButton as Button} from '../commen/button'
import shouldUpdate from '@/lib/shouldUpdate'
import EditTag from '../editTags'

const Title = ({className}) => (
    <div className={className}>
        标签<Button value='修改'/>
    </div>
)
const StyledTitle = styled(Title)`
    color: black;
    margin: 10px 0;
    padding: 0 20px;
    line-height: 28px;
    font-weight: bold;
    & > input {
      float: right;
    }
`
const Wrapper = styled.ul`
  margin: 20px 0 0 0;
  border-bottom: 1px solid ${COLOR.LINE};
  padding: 0 0 10px 0;
`
class Container extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = shouldUpdate
    this.state = {
      show: false
    }
  }
  onNewTagClick() {
    this.setState({show: true})
  }
  onBackClick(e) {
    if (e.target.dataset.id === 'editTagBack') {
      this.setState({show: false})
    }
  }
  render() {
    const {show} = this.state
    const {tags} = this.props
    return (
      <Wrapper>
        <StyledTitle />
        {tags.map(v => (
          <Link to={`/tags/${v.text}`} key={v.text}>
            <Item iconName="glyphicon glyphicon-tag" text={v.text} />
          </Link>
        ))}
        <Item 
          iconName="glyphicon glyphicon-plus"
          text="创建新标签"
          handleClick={::this.onNewTagClick}
        />
        {show && <EditTag onBackClick={::this.onBackClick} tags={tags}/>}
      </Wrapper>
    )
  }
}
const mapState = (state) => ({
  tags: state.app.lables
})
export default connect(mapState, null)(Container)