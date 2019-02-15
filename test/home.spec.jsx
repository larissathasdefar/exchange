import React from 'react'
import { shallow } from 'enzyme'

import Home from 'components/Home'

describe('Home', () => {
  it('Having 2 pockets', () => {
    const component = shallow(
      <Home
        user={{
          pockets: [
            { code: 'USD', amount: 44.90 },
            { code: 'GBP', amount: 50.56 },
          ],
          photo: 'https://scontent.fjoi1-2.fna.fbcdn.net/v/t1.0-1/c21.0.699.699a/s100x100/13240613_1031098473634742_623670164829509408_n.jpg?_nc_cat=106&_nc_ht=scontent.fjoi1-2.fna&oh=73ef6448c5749f90458e20e6bd8afe64&oe=5CEC15C9',
          name: 'Larissa Farias',
        }}
        currencies={{
          USD: 'United States Dollar',
          GBP: 'British Pound Sterling',
          EUR: 'Euro',
        }}
        history={{ push: route => console.log(route) }}
      />
    )
    expect(component.debug()).toMatchSnapshot()
  })
})