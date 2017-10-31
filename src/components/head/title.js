import styled from 'styled-components'
import React from 'react'

const Title = ({className, children}) => (
    <span className={className}>
        {children}
    </span>
)

const StyledTitle = styled(Title)`
    cursor: pointer;
    &:active{
        text-decoration: underline;
    }
`

export default StyledTitle