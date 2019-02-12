import React, { Component, Fragment } from 'react'
import _ from 'prop-types'
import { connect } from 'react-redux'
import { loadRates } from 'actions/currencies'
import Home from 'components/Home'
import Loading from 'components/Loading'
import Typography from '@material-ui/core/Typography'

class HomeContainer extends Component {
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
    const { user, currencies, history, loading, error } = this.props
    if (error) {
      return this.renderError()
    }
    return user.pockets.length && !loading
      ? (
        <Home
          user={user}
          history={history}
          currencies={currencies}
        />
      )
      : <Loading fullHeight />
  }
}

HomeContainer.propTypes = {
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer)
