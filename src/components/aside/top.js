import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'
import Item from './item'
import {Link} from 'react-router'

const Container = ({className}) => (
    <ul className={className}>
        <Link to='/home'>
            <Item iconName="glyphicon glyphicon-pencil" text="记事" />
        </Link>
        <Link to='/reminders'>
            <Item iconName="glyphicon glyphicon-bell" text="提醒" />
        </Link>
    </ul>
)
const StyledContainer = styled(Container)`
    margin: 10px 0;
    border-bottom: 1px solid ${COLOR.LINE};
    padding: 0 0 10px 0;
`

export default StyledContainer