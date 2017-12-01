import styled from 'styled-components'
import {notChecked, isChecked} from '@/static/javascript/icons'

const Container = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url(${props => props.isChecked ? isChecked : notChecked});
  background-size: cover;
  background-clip: border-box;
  background-origin: border-box;
`
export default Container