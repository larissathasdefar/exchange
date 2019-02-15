import React from 'react'
import { shallow } from 'enzyme'

import Exchange from 'components/Exchange'

describe('Exchange', () => {
  it('Having 2 pockets', () => {
    const component = shallow(
      <Exchange
        user={{
          pockets: [
            { code: 'USD', amount: 44.90 },
            { code: 'GBP', amount: 50.56 },
            { code: 'EUR', amount: 90.06 },
          ],
          photo: 'https://scontent.fjoi1-2.fna.fbcdn.net/v/t1.0-1/c21.0.699.699a/s100x100/13240613_1031098473634742_623670164829509408_n.jpg?_nc_cat=106&_nc_ht=scontent.fjoi1-2.fna&oh=73ef6448c5749f90458e20e6bd8afe64&oe=5CEC15C9',
          name: 'Larissa Farias',
          id: 1,
          followedRates: [
            { from: 'USD', to: 'GBP' },
            { from: 'EUR', to: 'GBP' },
            { from: 'GBP', to: 'USD' },
          ],
        }}
        currencies={{
          USD: 'United States Dollar',
          GBP: 'British Pound Sterling',
          EUR: 'Euro',
        }}
        history={{ push: route => console.log(route) }}
        rates={{
          USD: 1.129452,
          GBP: 0.882712,
          EUR: 1
        }}
        onLoadRates={jest.fn()}
        onConfirmExchange={jest.fn()}
      />
    )
    expect(component.debug()).toMatchSnapshot()
  })
})