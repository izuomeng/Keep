import React, {Component} from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'
import Item from './item'
import {Link} from 'react-router'
import {TextButton as Button} from '../button'

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
`
class Container extends Component {
    render() {
        return (
            <ul className={this.props.className}>
                <StyledTitle />
                <Link to='/tags'>
                    <Item iconName="glyphicon glyphicon-tag" text="Tag1" />
                </Link>
                <Item iconName="glyphicon glyphicon-plus" text="创建新标签" />
            </ul>
        )
    }
    shouldComponentUpdate() {
        return false
    }
}

const StyledContainer = styled(Container)`
    margin: 20px 0 0 0;
    border-bottom: 1px solid ${COLOR.LINE};
    padding: 0 0 10px 0;
`

export default StyledContainer