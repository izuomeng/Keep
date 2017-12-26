import styled from 'styled-components'
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import COLOR from '@/static/javascript/color'
import Menu from './menu'
import Title from './title'
import Search from './search'
import {
  LayerIcon,
  LayerIconII,
  RefreshIcon,
  MyReminder,
  SycnSuccess,
  SyncFail
} from './icons'
import Avatar from './avatar'
import {StyledIconSnake as Snake} from '../indicator'
import {toggleLayout} from '@/store/action/app'
import shouldUpdate from '@/lib/shouldUpdate'

const Header = styled.header `
  color: ${props => props.color || COLOR.ICON};
  z-index: 990;
  width: 100%;
  background-color: ${props => props.bgColor};
  padding: 8px;
  font-size: 22px;
  line-height: 48px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: fixed;
  transition: .2s;
  box-shadow: ${props => props.shadow
  ? `0 4px 5px 0 rgba(0,0,0,0.14),
        0 1px 10px 0 rgba(0,0,0,0.12),
        0 2px 4px -1px rgba(0,0,0,0.2);`
  : '0'}
`
class HeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isWaterFall: this.props.isWaterFall,
      shadow: false
    }
    this.shouldComponentUpdate = shouldUpdate.bind(this)
    this.onLayerClick = this
      .onLayerClick
      .bind(this)
    this.tesShadow = this
      .tesShadow
      .bind(this)
    window.addEventListener('scroll', this.tesShadow)
  }
  tesShadow() {
    clearTimeout(this.tid)
    this.tid = setTimeout(() => {
      if (document.documentElement.scrollTop > 0) {
        this.setState({shadow: true})
      } else {
        this.setState({shadow: false})
      }
    }, 10)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.tesShadow)
  }
  onLayerClick() {
    this.setState({
      isWaterFall: !this.state.isWaterFall
    })
    requestAnimationFrame(this.props.toggleLayout)
  }
  getTitle(path) {
    switch (path) {
      case '/search':
      case '/':
        return 'Keep'
      case '/reminders':
        return '提醒'
      case '/archive':
        return '归档'
      case '/trash':
        return '回收站'
      default:
        return '标签'
    }
  }
  getBgColor(path) {
    if (path === '/trash') {
      return COLOR.HEAD_TRASH
    } else if (path === '/' || path === '/login' || path === '/register') {
      return COLOR.HEAD
    } else if (path === '/search') {
      return COLOR.BLUE_HEAD
    } else if (path.indexOf('loading') > -1){
      return COLOR.HEAD
    } else {
      return COLOR.HEAD_REMINDER
    }
  }
  getColor(path, home, other = 'white') {
    if (path === '/' || path === '/login' || path === '/register' ||
    path.indexOf('loading') > -1) {
      return home
    }
    return other
  }
  render() {
    const progress = this.props.syncProgress,
      {isWaterFall} = this.state,
      {pathname} = this.props.location,
      bgColor = this.getBgColor(pathname),
      color = this.getColor(pathname, COLOR.ICON),
      hovColor = this.getColor(pathname, 'black', 'lightgrey'),
      title = this.getTitle(pathname),
      titleColor = this.getColor(pathname, 'black'),
      plhColor = this.getColor(pathname, COLOR.SEARCH_PLH, COLOR.SEARCH_PLH_OTHER),
      glassColor = this.getColor(pathname, COLOR.SEARCH_PLH, 'white'),
      seachBgColor = this.getColor(pathname, COLOR.SEARCH_BG, COLOR.SEARCH_BG_OTHER)
    if (progress === 'SUCCESS' || progress === 'FAIL') {
      clearTimeout(this.tid)
      this.tid = setTimeout(() => this.props.setStatic(), 1000)
    }
    return (
      <Header shadow={this.state.shadow} bgColor={bgColor} color={color}>
        <Menu/>
        <Title color={titleColor}>
          {title}
        </Title>
        <Search
          hovColor={hovColor}
          glassColor={glassColor}
          plhColor={plhColor}
          seachBgColor={seachBgColor}/> 
        {(progress === 'STATIC') && <RefreshIcon hovColor={hovColor}/>}
        {(progress === 'PENDING') && <Snake/>}
        {(progress === 'SUCCESS') && <SycnSuccess/>}
        {(progress === 'FAIL') && <SyncFail/>}
        {isWaterFall
          ? <LayerIcon handleClick={this.onLayerClick} hovColor={hovColor}/>
          : <LayerIconII handleClick={this.onLayerClick} hovColor={hovColor}/>}
        <MyReminder hovColor={hovColor}/>
        <Avatar/> {this.props.children}
      </Header>
    )
  }
}

const mapState = (state) => ({
  syncProgress: state.app.syncProgress,
  isWaterFall: state.app.isWaterFall
})
const mapDispatch = (dispatch) => ({
  setStatic() {
    dispatch({type: 'SYNC_STATIC'})
  },
  toggleLayout() {
    dispatch(toggleLayout())
  }
})

export default withRouter(connect(mapState, mapDispatch)(HeaderContainer))