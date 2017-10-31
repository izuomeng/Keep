import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'

const Input = styled.input`
    border-radius: 3px;
    background-color: ${COLOR.SEARCH_BG};
    border: 0;
    padding-left: 40px;
    width: calc(100% - 22px);
`
const Glass = ({className}) => (
    <span className={className + ' glyphicon glyphicon-search'}></span>
)
const StyledGlass = styled(Glass)`
    transform: translateX(30px);
    color: ${COLOR.ICON};
    cursor: pointer;
    vertical-align: -2px;
    &:hover{
        color: black;
    }
`
const Search = ({className}) => (
    <div className={className}>
        <StyledGlass /><Input />
    </div>
)
const StyledSearch = styled(Search)`
    display: inline-block;
    margin: 0 30px;
    vertical-align: bottom;
    flex: 1;
`

export default StyledSearch