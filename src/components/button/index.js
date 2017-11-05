import styled from 'styled-components'

const NormalButton = styled.input.attrs({
    type: 'button'
})`
    line-height: 28px;
    padding: 0 12px;
    background-color: #F8F8F8;
    border: 1px solid #c6c6c6;
    color: #666;
    border-radius: 2px;
    &:hover {
        background-color: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,0.1);
        background-image: linear-gradient(top,#fff,#f8f8f8);
    }
`

export {
    NormalButton,
}