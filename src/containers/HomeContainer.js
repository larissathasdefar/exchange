import React, { Component, Fragment } from 'react'
import _ from 'prop-types'
import { connect } from 'react-redux'
import Home from 'components/Home'
import Loading from 'ui/Loading'
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
    push: _.func,
  }).isRequired,
  loading: _.bool.isRequired,
  error: _.bool.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  currencies: state.currencies.names,
  loading: state.currencies.loadingNames,
  error: state.currencies.errorNames,
})

export default connect(
  mapStateToProps,
)(HomeContainer)
