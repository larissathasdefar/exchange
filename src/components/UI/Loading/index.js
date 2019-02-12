import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Container } from './Loading.styles'

const Loading = props => {
  return (
    <Container {...props}>
      <CircularProgress />
    </Container>
  )
}

export default Loading
