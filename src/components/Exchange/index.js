import React, { PureComponent } from 'react'
import _ from 'prop-types'
import { isEmpty } from 'ramda'
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

const getRate = (to, from, rates) => rates['EUR'] / rates[from] * rates[to]

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

  exchangeMoney = (inversed = false) => {
    const { convert, from, to, editingFrom } = this.state
    const { rates } = this.props
    const parsed = parseFloat(convert.replace(',', '.')) || 0
    if (parsed === 0) {
      return 0
    }
    const rate = getRate(from, to, rates)
    const amount = inversed
      ? parsed * rate
      : editingFrom
        ? parsed / rate
        : rate / parsed
    return amount.toFixed(2)
  }

  handleToggleConfirmation = () => {
    this.setState(({ openConfirmation }) => ({ openConfirmation: !openConfirmation }))
  }

  handleConfirm = () => {
    const { onConfirmExchange } = this.props
    const { from, to, convert, editingFrom } = this.state
    const amounts = [
      parseFloat(convert.replace(',', '.')),
      parseFloat(this.exchangeMoney())
    ]
    onConfirmExchange(
      { code: from, amount: amounts[editingFrom ? 0 : 1] },
      { code: to, amount: amounts[editingFrom ? 1 : 0] },
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
    this.setState({
      editingFrom,
      convert: `${this.exchangeMoney(editingFrom)}`,
    })
  }

  handleChangeStep = (index, currency) => {
    return currency.from
      ? this.setState({ from: currency.title, max: currency.max })
      : this.setState({ to: currency.title })
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
    const origin = editingFrom ? to : from
    const destiny = editingFrom ? from : to
    const rate = getRate(origin, destiny, rates)
    const helperText = error
      ? 'You can\'t exchange what you don\'t have'
      : `${formatMoney(1, destiny)} = ${formatMoney(rate, origin)}`
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
    const origin = editingFrom ? from : to
    const destiny = editingFrom ? to : from
    const rate = getRate(origin, destiny, rates)
    const symbol = editingFrom ? '+' : '-'
    return (
      <Complement onClick={() => this.handleChangeFieldEdit(!editingFrom)}>
        <Typography variant="h4" align="right">
          { `${symbol} ${this.exchangeMoney(!editingFrom)}` }
        </Typography>
        <Typography variant="subtitle1" align="right">
          {`${formatMoney(1, destiny)} = ${formatMoney(rate, origin)}`}
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
          isEmpty(rates)
            ? (
              <LoadingContainer>
                <Loading />
              </LoadingContainer>
            )
            : shouldRenderField
              ? this.renderField()
              : this.renderConversion()
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
