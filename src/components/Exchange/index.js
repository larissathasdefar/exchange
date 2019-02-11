import React, { PureComponent, Fragment } from 'react'
import _ from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import Stepper from '../UI/Stepper'
import {
  Container,
  Currency,
  CurrencyContainer,
  TextInput,
  Complement,
  StepContainer,
  ButtonsContainer,
  Cancel,
  ExchangeIcon,
} from './Exchange.styles'

class Exchange extends PureComponent {
  state={
    convert: '',
    openConfirmation: false,
  }

  handleToggleConfirmation = () => {
    this.setState(({ openConfirmation }) => ({ openConfirmation: !openConfirmation }))
  }

  handleConfirm = () => {
    this.handleToggleConfirmation()
    // TODO: Call Api
  }

  handleChange = event => {
    const { value } = event.target
    if (parseFloat(value) || value === '') {
      this.setState({ convert: value })
    }
  }

  renderField = max => {
    const { convert } = this.state
    return (
      <Complement>
        <TextInput
          autoFocus
          label="Convert"
          value={convert}
          max={max}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                { convert === '' ? '' : '-' }
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
          helperText="X1 = X0.44"
          onChange={this.handleChange}
        />
      </Complement>
    )
  }

  renderConversion = () => {
    const { convert } = this.state
    const parsed = parseFloat(convert) || 0
    return (
      <Complement>
        <Typography variant="h4" align="right">
          { `+ ${parsed.toFixed(2)}` }
        </Typography>
        <Typography variant="subtitle1" align="right">
          X1 = X0.44
        </Typography>
      </Complement>
    )
  }

  renderCurrency = ({ title, subtitle, from, max }) => {
    const { convert } = this.state
    return (
      <CurrencyContainer>
        <Currency>
          <Typography variant="h4" align="center">
            { title }
          </Typography>
          <Typography variant="subtitle1" align="center">
            { subtitle }
          </Typography>
        </Currency>
        { from ? this.renderField(max) : this.renderConversion() }
      </CurrencyContainer>
    )
  }

  render() {
    return (
      <Container elevation={1}>
        <Typography variant="h4">Let's Exchange</Typography>
        <Typography variant="caption" paragraph>How much would you like to exchange?</Typography>
        <StepContainer>
          <Stepper
            steps={[
              { from: true, title: 'GPB', subtitle: 'You have £48.54', max: 48.54 },
              { from: true, title: 'EUR', subtitle: 'You have €138.40', max: 138.40 },
              { from: true, title: 'USD', subtitle: 'You have $60.00', max: 60.00 },
            ]}
            renderStep={this.renderCurrency}
          />
        </StepContainer>
        <ExchangeIcon />
        <StepContainer>
          <Stepper
            steps={[
              { to: true, title: 'GPB', subtitle: 'You have £48.54', max: 48.54 },
              { to: true, title: 'EUR', subtitle: 'You have €138.40', max: 138.40 },
              { to: true, title: 'USD', subtitle: 'You have $60.00', max: 60.00 },
            ]}
            start={1}
            renderStep={this.renderCurrency}
          />
        </StepContainer>
        <ButtonsContainer>
          <Cancel variant="outlined" color="secondary">Cancel</Cancel>
          <Button variant="contained" color="primary">
            Exchange
            <MoneyIcon />
          </Button>
        </ButtonsContainer>
      </Container>
    )
  }
}

export default Exchange
