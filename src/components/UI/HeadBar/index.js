import React, { PureComponent, Fragment } from 'react'
import _ from 'prop-types'
import Logo from 'assets/revolut.png'
import AccountIcon from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import {
  Container,
  Menu,
  CurrentPage,
} from './HeadBar.styles'

class HeadBar extends PureComponent {
  state = {
    open: false,
  }

  render() {
    const { user } = this.props
    return (
      <Container>
        <img src={Logo} />
        <Menu>
          <Typography>Bank</Typography>
          <CurrentPage>Exchange</CurrentPage>
          {
            user.name !== ''
              ? (
                <Tooltip title={user.name}>
                  <AccountIcon fontSize="large" />
                </Tooltip>
              )
              : <AccountIcon fontSize="large" />
          }
        </Menu>
      </Container>
    )
  }
}

HeadBar.propTypes = {
  user: _.shape({
    name: _.string,
    photo: _.string,
  })
}

export default HeadBar
