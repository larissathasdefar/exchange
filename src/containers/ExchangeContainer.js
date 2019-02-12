import React, { Component, Fragment } from 'react'
import _ from 'prop-types'
import { connect } from 'react-redux'
import { loadRates } from 'actions/currencies'
import Exchange from 'components/Exchange'
import Loading from 'ui/Loading'
import Typography from '@material-ui/core/Typography'

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
      rates,
      errorRates,
      onLoadRates,
    } = this.props
    if (error || errorRates) {
      return this.renderError()
    }
    return user.pockets.length && !loading
      ? (
        <Exchange
          user={user}
          history={history}
          rates={rates}
          onLoadRates={onLoadRates}
        />
      )
      : <Loading fullHeight />
  }
}

ExchangeContainer.propTypes = {
}

const mapDispatchToProps = dispatch => ({
  onLoadRates: () => {
    dispatch(loadRates())
  },
})

const mapStateToProps = state => ({
  user: state.user,
  loading: state.currencies.loadingNames,
  error: state.currencies.errorNames,
  rates: state.currencies.rates,
  errorRates: state.currencies.errorRates,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeContainer)
