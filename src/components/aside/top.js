import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'
import Item from './item'


const Container = ({className}) => (
    <ul className={className}>
        <Item iconName="glyphicon glyphicon-pencil" text="记事" />
        <Item iconName="glyphicon glyphicon-bell" text="提醒" />
    </ul>
)
const StyledContainer = styled(Container)`
    margin: 10px 0;
    border-bottom: 1px solid ${COLOR.LINE};
    padding: 0 0 10px 0;
`

export default StyledContainer