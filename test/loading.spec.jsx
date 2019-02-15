import React from 'react'
import { shallow } from 'enzyme'

import Loading from 'ui/Loading'

describe('Loading', () => {
  it('Contains circular progress', () => {
    const component = shallow(<Loading />)
    expect(component.html()).toContain('MuiCircularProgress')
  })

  it('Snapshot', () => {
    const component = shallow(<Loading />)
    expect(component.debug()).toMatchSnapshot()
  })
})