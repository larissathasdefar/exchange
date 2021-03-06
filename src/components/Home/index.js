import React from 'react'
import _ from 'prop-types'
import Button from '@material-ui/core/Button'
import Stepper from 'ui/Stepper'
import {
  Container,
  Content,
  Actions,
  WhiteText,
} from './Home.styles'

const formatMoney = (amount, currency) => amount
  .toLocaleString(undefined, { style: 'currency', currency: currency })

const Home = ({ user, currencies, history }) => {
  return (
    <Container elevation={1}>
      <Content>
        <WhiteText variant="h4" paragraph>Pockets</WhiteText>
        {
          user.pockets.length && (
            <Stepper
              steps={
                user.pockets.map(({ amount, code }) => ({
                  title: `${formatMoney(amount, code)}`,
                  subtitle: `${code} - ${currencies[code]}`,
                  code,
                }))
              }
              align="center"
              textStyle={{ color: '#FFFFFF', fontWeight: '100' }}
              iconStyle={{ color: '#FFFFFF' }}
            />
          )
        }
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
  user: _.shape({
    name: _.string,
    photo: _.string,
    pockets: _.arrayOf(
      _.shape({
        amount: _.number,
        code: _.string
      })
    ),
  }).isRequired,
  currencies: _.shape({}).isRequired,
  history: _.shape({
    push: _.func.isRequired,
  }).isRequired,
}

export default Home
