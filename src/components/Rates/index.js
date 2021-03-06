import React, { PureComponent, Fragment } from 'react'
import _ from 'prop-types'
import { isEmpty, keys } from 'ramda'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import DeleteIcon from '@material-ui/icons/Delete'
import Loading from 'ui/Loading'
import {
  Container,
  MargedButton,
  SelectField,
  SelectContainer,
  Label,
  RateContainer,
  Rate,
  DeleteButton,
} from './Rates.styles'

const exchangeMoney = (to, from, rates) => rates['EUR'] / rates[to] * rates[from]

class Rates extends PureComponent {
  state={
    openAddCurrency: false,
    from: '',
    to: '',
    error: false,
  }

  handleToggleOpen = () => {
    this.setState(({ openAddCurrency }) => (
      { openAddCurrency: !openAddCurrency, error: false }
    ))
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleAddCurrency = () => {
    const { from, to } = this.state
    const { onAddCurrency } = this.props
    if (from === '' || to === '') {
      return this.setState({ error: true })
    } else {
      onAddCurrency(from, to)
      return this.setState({
        error: false,
        openAddCurrency: false,
        from: '',
        to: '',
      })
    }
  }

  handleRemoveCurrency = (from, to) => {
    const { onRemoveCurrency } = this.props
    onRemoveCurrency(from, to)
  }

  renderAddCurrency = () => {
    const { from, to, error } = this.state
    const { currencies } = this.props
    return <Fragment>
      <SelectContainer>
        <Label error={error && from === '' ? 1 : 0}>
          From: *
        </Label>
        <SelectField
          value={from}
          onChange={this.handleChange}
          name="from">
          <option value="">Select a currency</option>
          { keys(currencies).map(key => (
            <option value={key} key={key}>
              {`${key} - ${currencies[key]}`}
            </option>
          )) }
        </SelectField>
      </SelectContainer>
      <SelectContainer>
        <Label error={error && to === '' ? 1 : 0}>
          To: *
        </Label>
        <SelectField
          value={to}
          onChange={this.handleChange}
          name="to">
          <option value="">Select a currency</option>
          { keys(currencies).map(key => (
            <option value={key} key={key}>
              {`${key} - ${currencies[key]}`}
            </option>
          )) }
        </SelectField>
      </SelectContainer>
      <div>
        <MargedButton
          variant="outlined"
          color="secondary"
          onClick={this.handleToggleOpen}>
          Cancel
        </MargedButton>
        <MargedButton
          id="confirm-add-currency"
          variant="contained"
          color="primary"
          onClick={this.handleAddCurrency}>
          Add new
        </MargedButton>
      </div>
    </Fragment>
  }

  render() {
    const { followedRates, rates, currencies } = this.props
    const { openAddCurrency } = this.state
    const hasExchange = currency => rates[currency]
    return (
      <Container elevation={1}>
        <Typography variant="h4" align="center">
          Rates
        </Typography>
        <Typography variant="caption" align="center" paragraph>
          Keep track of your favorites exchanges.
        </Typography>
        {
          isEmpty(rates)
            ? <Loading />
            : (
              <Table>
                <TableBody>
                  {
                    followedRates.map(({ from, to }) => (
                      <RateContainer key={`${from}-${to}`}>
                        <TableCell>
                          <Typography variant="h5">
                            {`1 ${from}`}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Rate>
                            <Typography variant="h5">
                              { hasExchange(to)
                                ? exchangeMoney(from, to, rates).toFixed(2)
                                : 'Loading...' }
                            </Typography>
                            <Typography variant="caption">
                              { currencies[to] }
                            </Typography>
                          </Rate>
                          <DeleteButton onClick={() => this.handleRemoveCurrency(from, to)}>
                            <DeleteIcon fontSize="small" />
                          </DeleteButton>
                        </TableCell>
                      </RateContainer>
                    ))
                  }
                </TableBody>
              </Table>
            )
        }
        {
          openAddCurrency
            ? this.renderAddCurrency()
            : (
              <MargedButton
                id="add-currency"
                variant="outlined"
                color="primary"
                onClick={this.handleToggleOpen}>
                Add new currency
              </MargedButton>
            )
        }
      </Container>
    )
  }
}

Rates.propTypes = {
  followedRates: _.arrayOf(_.shape({
    form: _.string,
    to: _.string,
  })),
  rates: _.shape({}).isRequired,
  currencies: _.shape({}).isRequired,
  onAddCurrency: _.func.isRequired,
  onRemoveCurrency: _.func.isRequired,
}

export default Rates
