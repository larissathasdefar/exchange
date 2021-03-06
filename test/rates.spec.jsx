import React from 'react'
import { shallow } from 'enzyme'

import Rates from 'components/Rates'

describe('Rates', () => {
  it('Following USD to GBP', () => {
    const component = shallow(
      <Rates
        followedRates={[
          { from: 'USD', to: 'GBP' },
        ]}
        rates={{
          USD: 1.129452,
          GBP: 0.882712,
          EUR: 1
        }}
        currencies={{
          USD: 'United States Dollar',
          GBP: 'British Pound Sterling',
          EUR: 'Euro'
        }}
        onAddCurrency={jest.fn()}
        onRemoveCurrency={jest.fn()}
      />
    )
    expect(component.debug()).toMatchSnapshot()
    component.find('#add-currency').simulate('click')
    expect(component.debug()).toMatchSnapshot()
    component.find('[name="from"]').simulate('change', {
      target: { value: 'USD' },
    })
    expect(component.debug()).toMatchSnapshot()
    component.find('[name="to"]').simulate('change', {
      target: { value: 'EUR' },
    })
    expect(component.debug()).toMatchSnapshot()
    component.find('#confirm-add-currency').simulate('click')
    expect(component.debug()).toMatchSnapshot()
  })
})