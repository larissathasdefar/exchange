import React from 'react'
import _ from 'prop-types'
import { Container, Text } from './NotFound.styles'

const NotFound = ({ history }) => {
  const redirect = () => history.push('/pockets')
  return (
    <Container>
      <Text variant="h3" onClick={redirect}>Not Found</Text>
      <Text onClick={redirect}>Click here and go back to home</Text>
    </Container>
  )
}

NotFound.propTypes = {
  user: _.shape({
    name: _.string,
    photo: _.string,
  }),
  history: _.shape({
    push: _.func,
  }).isRequired,
}

export default NotFound
