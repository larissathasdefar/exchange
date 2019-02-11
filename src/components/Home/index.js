import React, { useState } from 'react'
import _ from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Stepper from '../UI/Stepper'
import {
  Container,
  ExchangeTo,
} from './Home.styles'

const currencies = [
  { name: 'American Dollar', symbol: '$', code: 'USD' },
  { name: 'British Pound', symbol: '£', code: 'GPB' },
  { name: 'Euro', symbol: '€', code: 'EUR' },
]

const Home = ({ history }) => {
  const [currency, setCurrency] = useState('GPB')
  return (
    <Container elevation={1}>
      <Typography variant="h4" paragraph>Wallet</Typography>
      <Stepper
        steps={[
          { title: '£48.54', subtitle: 'GPB - British Pound', code: 'GPB' },
          { title: '€138.40', subtitle: 'EUR - Euro', code: 'EUR' },
          { title: '$60.00', subtitle: 'USD - American Dollar', code: 'USD' },
        ]}
        align="center"
        onChangeStep={(index, step) => setCurrency(step.code)}
      />
      <Typography paragraph variant="h5">
        Exchange with:
      </Typography>
      <ExchangeTo>
        {
          currencies.map(({ name, symbol, code }) => currency === code
            ? (
              <Tooltip key={code} title="You can't exchange between the same currencies">
                <div>
                  <Button
                    disabled
                    variant="outlined"
                    onClick={() => history.push(`/exchange/${currency}/to/${code}`)}>
                    {`${symbol} - ${name}`}
                  </Button>
                </div>
              </Tooltip>
            )
            : (
              <Button
                key={code}
                variant="outlined"
                onClick={() => history.push(`/exchange/${currency}/to/${code}`)}>
                {`${symbol} - ${name}`}
              </Button>
            )
          )
        }
      </ExchangeTo>
    </Container>
  )
}

Home.propTypes = {
  history: _.shape({
    push: _.func.isRequired,
  }).isRequired,
}

export default Home
