import React, { Component, Fragment } from 'react'
import _ from 'prop-types'
import { connect } from 'react-redux'
import AppBar from 'containers/AppBarContainer'
import Home from 'components/Home'
import Transactions from 'components/Transactions'
import Loading from 'ui/Loading'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const Container = styled.div`
  padding: 0px 10px;
`

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

    return (
      <Fragment>
        <AppBar history={history} />
        {
          user.pockets.length && !loading
            ? (
              <Container>
                <Home
                  user={user}
                  history={history}
                  currencies={currencies}
                />
                <Transactions
                  transactions={user.transactions}
                />
              </Container>
            )
            : <Loading fullHeight />
        }
      </Fragment>
    )
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
    transactions: _.arrayOf(_.shape({
      form: _.shape({
        code: _.string,
        amount: _.number,
      }),
      to: _.shape({
        code: _.string,
        amount: _.number,
      }),
      date: _.date,
    })),
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
