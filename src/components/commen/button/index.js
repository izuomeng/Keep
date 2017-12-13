import styled from 'styled-components'
// import COLOR from '../../static/javascript/color'

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
const TextButton = styled.input.attrs({
    type: 'button',
    value: props => props.value
})`
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    width: 54px;
    background: transparent;
    border: 0;
    padding: 0;
    line-height: 28px;
    font-weight: 500;
    border-radius: 3px;
    color: ${props => props.disabled ? '#808080' : ''};
    opacity: ${props => props.disabled ? '.5' : '1'};
    &:hover{
        background: ${props => props.disabled ? '' : 'rgba(0,0,0,0.08)'};
    }
`

export {
    NormalButton,
    TextButton
}