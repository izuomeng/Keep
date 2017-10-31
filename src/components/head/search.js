import React from 'react'
import styled from 'styled-components'
import COLOR from '../../static/javascript/color'

const Input = styled.input`
    border-radius: 3px;
    background-color: ${COLOR.SEARCH_BG};
    border: 0;
    padding-left: 70px;
    width: calc(100% - 22px);
    height: 48px;
`
const Glass = ({className}) => (
    <span className={className + ' glyphicon glyphicon-search'}></span>
)
const StyledGlass = styled(Glass)`
    transform: translateX(40px);
    color: ${COLOR.ICON};
    cursor: pointer;
    &:hover{
        color: black;
    }
`
const Search = ({className}) => (
    <div className={className}>
        <StyledGlass /><Input placeholder="搜索"/>
    </div>
)
const StyledSearch = styled(Search)`
    display: inline-block;
    margin: 0 20px;
    flex: 1;
    font: normal 16px Roboto,sans-serif;
`

export default StyledSearch