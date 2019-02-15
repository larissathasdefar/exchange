import React, { PureComponent } from 'react'
import _ from 'prop-types'
import LogoImage from 'assets/revolut.png'
import AccountIcon from '@material-ui/icons/AccountCircle'
import Tooltip from '@material-ui/core/Tooltip'
import {
  Container,
  Menu,
  CurrentPage,
  Avatar,
  Logo,
  Link,
} from './HeadBar.styles'

class HeadBar extends PureComponent {
  state = {
    open: false,
  }

  render() {
    const { user, history } = this.props
    const redirect = () => history.push('/pockets')
    const image = user.photo !== ''
      ? <Avatar image={user.photo} alt={user.name} />
      : <AccountIcon fontSize="large" />
    return (
      <Container>
        <Logo src={LogoImage} onClick={redirect} />
        <Menu>
          <Link onClick={redirect}>Bank</Link>
          <CurrentPage onClick={redirect}>
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
