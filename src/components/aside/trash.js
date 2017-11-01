import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'
import Item from './item'
import {Link} from 'react-router'

const Container = ({className}) => (
    <ul className={className}>
        <Link to='/archive'>
            <Item iconName="glyphicon glyphicon-folder-close" text="归档" />
        </Link>
        <Link to='trash'>
            <Item iconName="glyphicon glyphicon-trash" text="回收站" />
        </Link>
    </ul>
)
const StyledContainer = styled(Container)`
    margin: 10px 0;
    border-bottom: 1px solid ${COLOR.LINE};
    padding: 0 0 10px 0;
`

export default StyledContainer