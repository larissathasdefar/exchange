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
  max: user.pockets[START_STEP_FROM].amount,
  to: user.pockets[reduceExtraSteps(START_STEP_TO, user.pockets)].code,
  error: false,
  editingFrom: true,
})

class Exchange extends PureComponent {
  state = getInitialState(this.props)

  componentDidMount() {
    const { onLoadRates } = this.props
    onLoadRates()
    this.interval = setInterval(() => onLoadRates(), 10000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleToggleConfirmation = () => {
    this.setState(({ openConfirmation }) => ({ openConfirmation: !openConfirmation }))
  }

  handleConfirm = () => {
    const { onConfirmExchange } = this.props
    const { from, to, convert } = this.state
    onConfirmExchange(
      { code: from, amount: parseFloat(convert.replace(',', '.')) },
      { code: to, amount: parseFloat(this.getFinalAmount()) },
    )
    this.setState(({ openConfirmation }) => ({
      openConfirmation: !openConfirmation,
      convert: '',
    }))
  }

  handleChange = event => {
    const { max } = this.state
    const { value } = event.target
    const getValue = value === '' ? '0' : value
    const isValidNumber = new RegExp(/^[0-9]+([\.,][0-9]{0,2})?$/gm)
      .test(getValue)
    const hasAmount = parseFloat(getValue.replace(',', '.')) <= max
    if (isValidNumber) {
      this.setState({ convert: value, error: !hasAmount })
    }
  }

  handleChangeFieldEdit = editingFrom => {
    const { rates } = this.props
    const { from, to, convert } = this.state
    const converted = editingFrom
      ? exchangeMoney(from, to, rates)
      : exchangeMoney(to, from, rates)
    this.setState({
      editingFrom,
      convert: `${(converted*convert).toFixed(2)}`,
    })
  }

  handleChangeStep = (index, currency) => {
    return currency.from
      ? this.setState({ from: currency.title, max: currency.max })
      : this.setState({ to: currency.title })
  }

  getFinalAmount = () => {
    const { convert, from, to, editingFrom } = this.state
    const { rates } = this.props
    const parsed = parseFloat(convert.replace(',', '.')) || 0
    const rate = editingFrom
      ? exchangeMoney(from, to, rates)
      : exchangeMoney(to, from, rates)
    return (parsed / rate).toFixed(2)
  }

  renderConfirmation = () => {
    const { openConfirmation } = this.state
    return (
      <Dialog
        open={openConfirmation}
        onClose={this.handleToggleConfirmation}>
        <DialogTitle>Do you want to confirm the exchange?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you confirm you will not be able to undo this later.
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

  renderField = () => {
    const { convert, to, from, error, editingFrom } = this.state
    const { rates } = this.props
    const rate = editingFrom
      ? exchangeMoney(to, from, rates)
      : exchangeMoney(from, to, rates)
    const helperText = error
      ? 'You can\'t exchange what you don\'t have'
      : editingFrom
        ? `${formatMoney(1, from)} = ${formatMoney(rate, to)}`
        : `${formatMoney(1, to)} = ${formatMoney(rate, to)}`
    const symbol = editingFrom ? '-' : '+'
    return (
      <Complement>
        <TextInput
          autoFocus
          error={error}
          label="Convert"
          value={convert}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                { convert === '' ? '' : symbol }
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
          helperText={helperText}
          onChange={this.handleChange}
        />
      </Complement>
    )
  }

  renderConversion = () => {
    const { to, from, editingFrom } = this.state
    const { rates } = this.props
    const rate = editingFrom
      ? exchangeMoney(from, to, rates)
      : exchangeMoney(to, from, rates)
    const symbol = editingFrom ? '+' : '-'
    return (
      <Complement onClick={() => this.handleChangeFieldEdit(!editingFrom)}>
        <Typography variant="h4" align="right">
          { `${symbol} ${this.getFinalAmount()}` }
        </Typography>
        <Typography variant="subtitle1" align="right">
          { editingFrom
            ? `${formatMoney(1, to)} = ${formatMoney(rate, from)}`
            : `${formatMoney(1, from)} = ${formatMoney(rate, to)}`}
        </Typography>
      </Complement>
    )
  }

  renderCurrency = ({ title, subtitle, from }) => {
    const { rates } = this.props
    const { editingFrom } = this.state
    const shouldRenderField = (from && editingFrom)
      || (!from && !editingFrom)
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
            ? shouldRenderField
              ? this.renderField()
              : this.renderConversion()
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
    const { from, to, error } = this.state
    return (
      <Button
        variant="contained"
        color="primary"
        disabled={from === to || error}
        onClick={this.handleToggleConfirmation}>
        Exchange
        <MoneyIcon />
      </Button>
    )
  }

  render() {
    const { user, history } = this.props
    const { from, to, error } = this.state
    const getSteps = type => user.pockets.map(({ amount, code }) => ({
      title: code,
      subtitle: `You have ${formatMoney(amount, code)}`,
      max: amount,
      [type]: true,
    }))
    const errorMessage = from === to
      ? 'You can\'t exchange between the same currency'
      : 'You can\'t exchange what you don\'t have'
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
          { from === to || error
            ? (
              <Tooltip title={errorMessage}>
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

Exchange.propTypes = {
  user: _.shape({
    name: _.string,
    photo: _.string,
    pockets: _.arrayOf(
      _.shape({
        amount: _.number,
        code: _.string
      })
    ),
    followedRates: _.arrayOf(_.shape({
      form: _.string,
      to: _.string,
    })),
  }).isRequired,
  history: _.shape({
    push: _.func.isRequired,
  }).isRequired,
  rates: _.shape({}).isRequired,
  onLoadRates: _.func.isRequired,
  onConfirmExchange: _.func.isRequired,
}

export default Exchange
