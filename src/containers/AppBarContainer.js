import React, { Component } from 'react'
import _ from 'prop-types'
import HeadBar from 'ui/HeadBar'
import { connect } from 'react-redux'
import { setUser } from 'actions/user'
import { loadCurrencies } from 'actions/currencies'

class AppBarContainer extends Component {
  componentDidMount () {
    const { onSetUser, onLoadCurrencies } = this.props
    onSetUser({
      pockets: [
        { code: 'USD', amount: 44.90 },
        { code: 'GBP', amount: 50.56 },
        { code: 'EUR', amount: 90.06 },
      ],
      photo: '',
      name: 'Larissa Farias',
      followedRates: [
        { from: 'USD', to: 'GBP' },
        { from: 'USD', to: 'EUR' },
        { from: 'EUR', to: 'GBP' },
        { from: 'GBP', to: 'USD' },
      ],
    })
    onLoadCurrencies()
  }

  render () {
    const { user } = this.props
    return (
      <HeadBar user={user} />
    )
  }
}

AppBarContainer.propTypes = {
  user: _.shape({
    name: _.string,
    photo: _.string,
    pockets: _.arrayOf(
      _.shape({
        code: _.string,
        amount: _.number,
      }),
    ),
  }).isRequired,
  onSetUser: _.func.isRequired,
  onLoadCurrencies: _.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  onSetUser: user => {
    dispatch(setUser(user))
  },
  onLoadCurrencies: () => {
    dispatch(loadCurrencies())
  },
})

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppBarContainer)
