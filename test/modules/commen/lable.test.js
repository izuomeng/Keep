import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import {shallow} from 'enzyme'
import Tag from '../../../src/components/commen/lable/tags'
configure({ adapter: new Adapter() })
const props = {
  dataID: 'testID'
}

describe('Commen components', () => {
  describe('Tags in lable', () => {
    it('should render a tag', () => {
      const Wrapper = shallow(<Tag dataID={props.dataID}>Test tag</Tag>)
      expect(Wrapper.find('div').exists())
    })
  })
})