import styled from 'styled-components'
import React from 'react'

const Lable = styled.div`
    display: inline-block;
    background-color: rgba(0,0,0,0.7);
    padding: 5px;
    color: white;
    border-radius: 3px;
    white-space: nowrap;
    font-size: 10px;
    margin-left: calc(-50% - 7px);
`
const DadLable = ({className, value}) => (
    <div className={className}>
        <Lable>{value}</Lable>
    </div>
)

const StyledDadLable = styled(DadLable)`
    display: none;
    position: absolute;
    top: 30px;
`

export default StyledDadLable