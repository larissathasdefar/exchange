import React, { PureComponent } from 'react'
import _ from 'prop-types'
import Logo from 'assets/revolut.png'
import AccountIcon from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import {
  Container,
  Menu,
  CurrentPage,
  Avatar,
} from './HeadBar.styles'

class HeadBar extends PureComponent {
  state = {
    open: false,
  }

  render() {
    const { user, history } = this.props
    const image = user.photo !== ''
      ? <Avatar image={user.photo} alt={user.name} />
      : <AccountIcon fontSize="large" />
    return (
      <Container>
        <img src={Logo} />
        <Menu>
          <Typography>Bank</Typography>
          <CurrentPage onClick={() => history.push('/pockets')}>
            Exchange
          </CurrentPage>
          {
            user.name !== ''
              ? (
                <Tooltip title={user.name}>
                  {image}
                </Tooltip>
              )
              : image
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
  }),
  history: _.shape({
    push: _.func,
  }).isRequired,
}

export default HeadBar
