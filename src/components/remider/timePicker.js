import styled from 'styled-components'

const Container = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  width: 100%;
  height: 200px;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  background: #fff;
  position: absolute;
  top: 26px;
  left: 0;
  z-index: 999;
`
export default Container