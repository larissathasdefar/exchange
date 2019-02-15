import React from 'react'
import { shallow } from 'enzyme'

import Stepper from 'ui/Stepper'

describe('Stepper', () => {
  it('Basic example', () => {
    const component = shallow(
      <Stepper
        steps={[
          { title: 'First', subtitle: 'Slide' },
          { title: 'Second', subtitle: 'Slide' },
          { title: 'Third', subtitle: 'Slide' }
        ]}
      />
    )
    expect(component.debug()).toMatchSnapshot()
  })

  it('Starting at Second item', () => {
    const component = shallow(
      <Stepper
        steps={[
          { title: 'First', subtitle: 'Slide' },
          { title: 'Second', subtitle: 'Slide' },
          { title: 'Third', subtitle: 'Slide' }
        ]}
        start={1}
      />
    )
    expect(component.debug()).toMatchSnapshot()
  })
})