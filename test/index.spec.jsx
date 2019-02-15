import React from 'react'
import { shallow } from 'enzyme'

import Loading from '../src/components/UI/Loading'

describe('eita', () => {
  it('faz alguma coisa', () => {
    const component = shallow(<Loading />)
    expect(component.html()).toContain('MuiCircularProgress')
  })
})