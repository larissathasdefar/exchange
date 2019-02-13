import React, { Component, Fragment } from 'react'
import _ from 'prop-types'
import { connect } from 'react-redux'
import { loadRates } from 'actions/currencies'
import Exchange from 'components/Exchange'
import Rates from 'components/Rates'
import Loading from 'ui/Loading'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

class ExchangeContainer extends Component {
  renderError = () => {
    return (
      <Fragment>
        <Typography variant="h4" align="center">
          An error ocurred.
        </Typography>
        <Typography variant="h5" align="center">
          Please, try again later.
        </Typography>
      </Fragment>
    )
  }

  render () {
    const {
      user,
      history,
      loading,
      error,
      currencies,
      rates,
      errorRates,
      onLoadRates,
    } = this.props
    if (error || errorRates) {
      return this.renderError()
    }
    return user.pockets.length && !loading
      ? (
        <Container>
          <Exchange
            user={user}
            history={history}
            rates={rates.list}
            onLoadRates={onLoadRates}
          />
          <Rates
            rates={rates.list}
            currencies={currencies}
            followedRates={user.followedRates}
          />
          { rates.updatedAt && (
            <Typography variant="caption" align="center">
              {`Updated at ${new Date(rates.updatedAt).toLocaleString()}`}
            </Typography>
          ) }
        </Container>
      )
      : <Loading fullHeight />
  }
}

ExchangeContainer.propTypes = {
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
  loading: _.bool.isRequired,
  error: _.bool.isRequired,
  rates: _.shape({}).isRequired,
  currencies: _.shape({}).isRequired,
  errorRates: _.bool.isRequired,
  onLoadRates: _.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  onLoadRates: () => {
    dispatch(loadRates())
  },
})

const mapStateToProps = state => ({
  user: state.user,
  currencies: state.currencies.names,
  loading: state.currencies.loadingNames,
  error: state.currencies.errorNames,
  rates: state.currencies.rates,
  errorRates: state.currencies.errorRates,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeContainer)