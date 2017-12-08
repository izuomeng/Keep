import styled from 'styled-components'
import React from 'react'

const Lable = styled.div`
    display: inline-block;
    background-color: rgba(0,0,0,0.7);
    padding: 5px;
    color: white;
    border-radius: 3px;
    white-space: nowrap;
    font-size: 12px;
    position: relative;
    line-height: normal;
    left: calc(-50% - 7px);
`
const DadLable = ({className, value, dataID}) => (
    <div className={className}>
        <Lable data-id={dataID}>{value}</Lable>
    </div>
)

const StyledDadLable = styled(DadLable)`
    visibility: hidden;
    display: inline-block;
    position: absolute;
    z-index: 999;
    top: 30px;
`

export default StyledDadLable