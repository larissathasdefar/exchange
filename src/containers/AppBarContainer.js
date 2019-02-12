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
      currencies: [
        { code: 'USD', amount: 44.90 },
        { code: 'GPB', amount: 50.56 },
        { code: 'EUR', amount: 90.06 },
      ],
      photo: '',
      name: 'Larissa Farias',
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
