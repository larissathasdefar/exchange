import React, { Component } from 'react'
import _ from 'prop-types'
import HeadBar from 'ui/HeadBar'
import { connect } from 'react-redux'
import { setUser } from 'actions/user'

class AppBarContainer extends Component {
  componentDidMount () {
    const { onSetUser } = this.props
    onSetUser({
      currencies: [
        { code: 'USD', amount: 44.90 },
        { code: 'GPB', amount: 50.56 },
        { code: 'EUR', amount: 90.06 },
      ],
      photo: '',
      name: 'Larissa Farias',
    })
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
  }
})

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppBarContainer)
