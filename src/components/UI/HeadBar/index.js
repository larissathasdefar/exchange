import React, { PureComponent, Fragment } from 'react'
import _ from 'prop-types'
import Logo from '../../../assets/revolut.png'
import AccountIcon from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'
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
    return (
      <Container>
        <img src={Logo} />
        <Menu>
          <Typography>Bank</Typography>
          <CurrentPage>Exchange</CurrentPage>
          <AccountIcon fontSize="large" />
        </Menu>
      </Container>
    )
  }
}

HeadBar.propTypes = {
}

export default HeadBar
