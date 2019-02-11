import React, { useState } from 'react'
import _ from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Stepper from '../UI/Stepper'
import { Container, Content, ActionsContainer } from './Home.styles'

const currencies = [
  { name: 'American Dollar', symbol: '$', code: 'USD' },
  { name: 'British Pound', symbol: '£', code: 'GPB' },
  { name: 'Euro', symbol: '€', code: 'EUR' },
]

const Home = ({ history }) => {
  const [currency, setCurrency] = useState('GPB')
  return (
    <Container elevation={1}>
      <Content>
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
      </Content>
      <Typography paragraph variant="h5">
        Exchange with:
      </Typography>
      <ActionsContainer>
        {
          currencies.map(({ name, symbol, code }) => (
            <Button
              key={code}
              variant="outlined"
              disabled={currency === code}
              onClick={() => history.push(`/exchange/${currency}/to/${code}`)}>
              {`${symbol} - ${name}`}
            </Button>
          ))
        }
      </ActionsContainer>
    </Container>
  )
}

Home.propTypes = {
  history: _.shape({
    push: _.func.isRequired,
  }).isRequired,
}

export default Home
