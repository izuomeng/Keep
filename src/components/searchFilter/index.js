import React from 'react'
import styled, { keyframes } from 'styled-components'
import Block from './block'

function getAnimation(index) {
  switch (index) {
    case 0:
      return '.5s forwards'
    case 1:
      return '.4s .2s forwards'
    case 2:
      return '.3s .4s forwards'
    default:
      return '0'
  }
}
const runUp = keyframes`
  from {
    transform: translateY(800px);
  }
  to {
    transform: translateY(0)
  }
`
const Container = styled.div `
  width: 640px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),
              0 3px 1px -2px rgba(0,0,0,0.2),
              0 1px 5px 0 rgba(0,0,0,0.12);
  margin: 16px auto;
  background: #fff;
  transform: translateY(800px);
  animation: ${runUp} ${props => getAnimation(props.index)}
`
const Title = styled.div `
  padding: 10px 10px 5px 10px;
  font-size: 15px;
  font-weight: bold;
`
const typeOptions = [
  {
    text: '提醒',
    icon: 'glyphicon glyphicon-bell'
  }, {
    text: '列表',
    icon: 'glyphicon glyphicon-th-list'
  }, {
    text: '图片',
    icon: 'glyphicon glyphicon-picture'
  }, {
    text: '绘图',
    icon: 'glyphicon glyphicon-edit'
  }
]
export default({
  filters = [],
  handleTypeClick,
  handleTagClick,
  handleColorClick
}) => (
  <div>
    {filters.map((filter, index) => (
      <Container key={filter.title} index={index}>
        <Title>{filter.title}</Title>
        {filter.title === '类型' && 
        typeOptions.map((option, index) => (<Block
          onClick={handleTypeClick(option.text)}
          key={option.text}
          type='type'
          options={{
          ...option
        }}
          first={index === 0}/>))}
        {filter.title === '标签' && filter
          .tags
          .map((tag, index) => (<Block
            onClick={handleTagClick(tag)}
            key={tag}
            first={index === 0}
            type='tag'
            options={{
            text: tag,
            icon: 'glyphicon glyphicon-tag'
          }}/>))}
        {filter.title === '颜色' && filter
          .colors
          .map(color => (<Block
            key={color}
            type='circle'
            options={{background: color}}
            onClick={handleColorClick(color)}/>))}
      </Container>
    ))}
  </div>
)
