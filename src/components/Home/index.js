import React from 'react'
import _ from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Stepper from '../UI/Stepper'
import {
  Container,
  Content,
  Actions,
  WhiteText,
} from './Home.styles'

const currencies = [
  { name: 'American Dollar', symbol: '$', code: 'USD' },
  { name: 'British Pound', symbol: '£', code: 'GPB' },
  { name: 'Euro', symbol: '€', code: 'EUR' },
]

const Home = ({ history }) => {
  return (
    <Container elevation={1}>
      <Content>
        <WhiteText variant="h4" paragraph>Currencies</WhiteText>
        <Stepper
          steps={[
            { title: '£48.54', subtitle: 'GPB - British Pound', code: 'GPB' },
            { title: '€138.40', subtitle: 'EUR - Euro', code: 'EUR' },
            { title: '$60.00', subtitle: 'USD - American Dollar', code: 'USD' },
          ]}
          align="center"
          textStyle={{ color: '#FFFFFF', fontWeight: '100' }}
        />
      </Content>
      <Actions>
        <Button
          variant="outlined"
          onClick={() => history.push('/exchange')}>
          Exchange
        </Button>
      </Actions>
    </Container>
  )
}

Home.propTypes = {
  history: _.shape({
    push: _.func.isRequired,
  }).isRequired,
}

export default Home
