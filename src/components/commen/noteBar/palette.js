import React from 'react'
import styled from 'styled-components'
import COLOR from '../color'
import Lable from '../lable'
import {confirm} from '@/static/javascript/icons'

const ColorBlock = styled.div`
  position: relative;
  display: inline-block;
  background-color: ${props => props.color};
  background-image: ${props => props.bgImg ? `url(${props.bgImg})` : ''};
  background-size: contain;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin: 4px 2px;
  border: 2px solid ${props => props.color};
  &:hover {
      border: 2px solid grey
  }
  &:hover>div {
      visibility: visible;
      display: inline-block;
  }
`
const StyledLable = Lable.extend`
    margin-left: 19px;
    z-index: 999;
`
const PaletteWrapper = styled.div.attrs({
  id: 'palette',
  'data-id': 'newNote'
})`
  line-height: 0;
  background: white;
  width: 132px;
  opacity: 0;
  transition: .3s;
  padding: 6px;
  box-shadow: 0 0 10px 0 darkgrey;
`
const Palette = ({className, handleClick, bgColor}) => {
const colors = [
    COLOR.WHITE,
    COLOR.RED,
    COLOR.ORANGE,
    COLOR.YELLOW,
    COLOR.GREEN,
    COLOR.CYAN_BLUE,
    COLOR.BLUE,
    COLOR.DARK_BLUE,
    COLOR.PURPLE,
    COLOR.PINK,
    COLOR.BROWN,
    COLOR.GREY
],
names = ['白','红','橙','黄','绿','青','蓝','深蓝','紫','粉','棕','灰']
return (
    <div className={className}>
        <PaletteWrapper>
            {colors.map((v, i) => {
                let current = ''
                if (v === bgColor) {
                     current = confirm
                }
                return (
                    <ColorBlock 
                        color={v} 
                        key={v} 
                        data-id="newNote" 
                        onClick={() => handleClick(v)}
                        bgImg={current}
                    >
                        <StyledLable value={names[i] + '色'} />
                    </ColorBlock>
                )
            })}
        </PaletteWrapper>
    </div>
)
}
const StyledPalette = styled(Palette)`
  display: inline-block;
  visibility: hidden;
  position: absolute;
  top: -113px;
  left: 5px;
  z-index: 999;
  &:hover ~div {
      display: none;
  }
`
export default StyledPalette