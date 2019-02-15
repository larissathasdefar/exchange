import React from 'react'
import { shallow } from 'enzyme'

import Transactions from 'components/Transactions'

describe('Transactions', () => {
  it('Having 1 trasaction history', () => {
    const component = shallow(
      <Transactions
        transactions={[
          {
            from: { code: 'EUR', amount: 15 },
            to: { code: 'GBP', amount: 3.19 },
            date: new Date('12/22/2018 08:55'),
          },
        ]}
      />
    )
    expect(component.debug()).toMatchSnapshot()
    expect(component.html()).toContain('Exchanged to GBP')
    expect(component.html()).toContain('22 Dec 2018 - 08:55')
    expect(component.html()).toContain('- € 15,00')
    expect(component.html()).toContain('+ £ 3,19')
  })

  it('Having no trasactions history', () => {
    const component = shallow(
      <Transactions
        transactions={[]}
      />
    )
    expect(component.debug()).toMatchSnapshot()
    expect(component.html()).toContain('You don&#x27;t have transactions yet.')
  })
})