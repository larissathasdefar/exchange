import React from 'react'
import { shallow } from 'enzyme'

import HeadBar from 'ui/HeadBar'

describe('HeadBar', () => {
  it('Empty user', () => {
    const component = shallow(
      <HeadBar
        user={{ name: '', photo: '' }}
        history={{ push: route => console.log(route) }}
      />
    )
    expect(component.debug()).toMatchSnapshot()
  })

  it('User without photo', () => {
    const component = shallow(
      <HeadBar
        user={{ name: 'Larissa Farias', photo: '' }}
        history={{ push: route => console.log(route) }}
      />
    )
    expect(component.debug()).toMatchSnapshot()
  })

  it('User with photo', () => {
    const component = shallow(
      <HeadBar
        user={{ name: 'Larissa Farias', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png' }}
        history={{ push: route => console.log(route) }}
      />
    )
    expect(component.debug()).toMatchSnapshot()
  })
})