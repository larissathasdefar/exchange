import React, { PureComponent, Fragment } from 'react'
import _ from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import Stepper from 'ui/Stepper'
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
  LoadingContainer,
} from './Exchange.styles'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Loading from 'ui/Loading'

const formatMoney = (amount, currency) => amount
  .toLocaleString(undefined, { style: 'currency', currency: currency })

const exchangeMoney = (to, from, rates) => rates['EUR'] / rates[from] * rates[to]

const START_STEP_FROM = 0
const START_STEP_TO = 1

// If the start step was 3 and the user has only 2 pockets,
// this will return the 3th step item instead of an error
const reduceExtraSteps = (start, steps) => (
  steps.length === 1
    ? 0
    : start >= steps.length
      ? start % steps.length
      : start
)

const getInitialState = ({ user }) => ({
  convert: '',
  openConfirmation: false,
  from: user.pockets[START_STEP_FROM].code,
  to: user.pockets[reduceExtraSteps(START_STEP_TO, user.pockets)].code,
})

class Exchange extends PureComponent {
  state = getInitialState(this.props)

  componentDidMount() {
    const { onLoadRates } = this.props
    onLoadRates()
    // TODO: uncomment the line below
    // this.interval = setInterval(() => onLoadRates(), 10000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
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

  handleChangeStep = (index, currency) => {
    return currency.from
      ? this.setState({ from: currency.title })
      : this.setState({ to: currency.title })
  }

  renderConfirmation = () => {
    const { convert, from, openConfirmation } = this.state
    return (
      <Dialog
        open={openConfirmation}
        onClose={this.handleToggleConfirmation}>
        <DialogTitle>{`Do you want to confirm the exchange ${formatMoney(convert, from)}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you confirm you will not be able to undo this transaction later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Cancel
            variant="outlined"
            color="secondary"
            onClick={this.handleToggleConfirmation}>
            Cancel
          </Cancel>
          <Button
            autoFocus
            variant="contained"
            color="primary"
            onClick={this.handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderField = max => {
    const { convert, to, from } = this.state
    const { rates } = this.props
    const rate = exchangeMoney(to, from, rates)
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
          helperText={`${formatMoney(1, from)} = ${formatMoney(rate, to)}`}
          onChange={this.handleChange}
        />
      </Complement>
    )
  }

  renderConversion = () => {
    const { convert, to, from } = this.state
    const { rates } = this.props
    const parsed = parseFloat(convert) || 0
    const rate = exchangeMoney(from, to, rates)
    const finalAmount = parsed / rate
    return (
      <Complement>
        <Typography variant="h4" align="right">
          { `+ ${finalAmount.toFixed(2)}` }
        </Typography>
        <Typography variant="subtitle1" align="right">
          {`${formatMoney(1, to)} = ${formatMoney(rate, from)}`}
        </Typography>
      </Complement>
    )
  }

  renderCurrency = ({ title, subtitle, from, max }) => {
    const { rates } = this.props
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
        {
          Object.keys(rates).length
            ? from ? this.renderField(max) : this.renderConversion()
            : (
              <LoadingContainer>
                <Loading />
              </LoadingContainer>
            )
        }
      </CurrencyContainer>
    )
  }

  renderExchangeButton = () => {
    const { from, to } = this.state
    return (
      <Button
        variant="contained"
        color="primary"
        disabled={from === to}
        onClick={this.handleToggleConfirmation}>
        Exchange
        <MoneyIcon />
      </Button>
    )
  }

  render() {
    const { user, history } = this.props
    const { from, to } = this.state
    const getSteps = type => user.pockets.map(({ amount, code }) => ({
      title: code,
      subtitle: `You have ${formatMoney(amount, code)}`,
      max: amount,
      [type]: true,
    }))
    return (
      <Container elevation={1}>
        <Typography variant="h4" align="center">
          Let's Exchange
        </Typography>
        <Typography variant="caption" align="center" paragraph>
          How much would you like to exchange?
        </Typography>
        <StepContainer>
          <Stepper
            steps={getSteps('from')}
            start={START_STEP_FROM}
            renderStep={this.renderCurrency}
            onChangeStep={this.handleChangeStep}
          />
        </StepContainer>
        <ExchangeIcon />
        <StepContainer>
          <Stepper
            steps={getSteps('to')}
            start={START_STEP_TO}
            renderStep={this.renderCurrency}
            onChangeStep={this.handleChangeStep}
          />
        </StepContainer>
        <ButtonsContainer>
          <Cancel
            variant="outlined"
            color="secondary"
            onClick={() => history.push('/pockets')}>
            Cancel
          </Cancel>
          { from === to
            ? (
              <Tooltip title="You can't exchange between the same currency">
                <div>
                  { this.renderExchangeButton() }
                </div>
              </Tooltip>
            )
            : this.renderExchangeButton()
          }
        </ButtonsContainer>
        { this.renderConfirmation() }
      </Container>
    )
  }
}

export default Exchange
