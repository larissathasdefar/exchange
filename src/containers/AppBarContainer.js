import React, { Component } from 'react'
import _ from 'prop-types'
import { isNil } from 'ramda'
import HeadBar from 'ui/HeadBar'
import { connect } from 'react-redux'
import { setUser } from 'actions/user'
import { loadCurrencies } from 'actions/currencies'

class AppBarContainer extends Component {
  componentDidMount () {
    const { user, onSetUser, onLoadCurrencies } = this.props
    if (isNil(user.id)){
      onSetUser({
        pockets: [
          { code: 'USD', amount: 44.90 },
          { code: 'GBP', amount: 50.56 },
          { code: 'EUR', amount: 90.06 },
        ],
        photo: 'https://scontent.fjoi1-2.fna.fbcdn.net/v/t1.0-1/c21.0.699.699a/s100x100/13240613_1031098473634742_623670164829509408_n.jpg?_nc_cat=106&_nc_ht=scontent.fjoi1-2.fna&oh=73ef6448c5749f90458e20e6bd8afe64&oe=5CEC15C9',
        name: 'Larissa Farias',
        id: 1,
        followedRates: [
          { from: 'USD', to: 'GBP' },
          { from: 'EUR', to: 'GBP' },
          { from: 'GBP', to: 'USD' },
        ],
        transactions: [
          {
            from: { code: 'EUR', amount: 23 },
            to: { code: 'USD', amount: 26.07 },
            date: new Date('02/12/2019 14:38'),
          },
          {
            from: { code: 'EUR', amount: 15 },
            to: { code: 'GBP', amount: 3.19 },
            date: new Date('12/22/2018 08:55'),
          }
        ],
      })
    }
    onLoadCurrencies()
  }

  render () {
    const { user, history } = this.props
    return (
      <HeadBar
        user={user}
        history={history}
      />
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
  history: _.shape({
    push: _.func,
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
