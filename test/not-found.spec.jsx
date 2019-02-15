import React from 'react'
import { shallow } from 'enzyme'

import NotFound from 'components/NotFound'

describe('NotFound', () => {
  it('Snapshot', () => {
    const component = shallow(
      <NotFound
        history={{ push: route => console.log(route) }}
      />
    )
    expect(component.debug()).toMatchSnapshot()
  })
})