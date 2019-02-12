import React, { Component } from 'react'
import _ from 'prop-types'
import { connect } from 'react-redux'
import { loadRates } from 'actions/currencies'
import Home from 'components/Home'
import Loading from 'components/Loading'

class HomeContainer extends Component {
  render () {
    const { user, currencies, history, loading, error } = this.props
    // TODO: Should I verify here loading and error instead of <Home />?
    return user.pockets.length
      ? (
        <Home
          user={user}
          history={history}
          currencies={currencies}
          loading={loading}
          error={error}
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
