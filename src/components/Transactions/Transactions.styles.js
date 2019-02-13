import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export const Container = styled(Paper)`
  max-width: 972px;
  margin: 0 auto;
  margin-bottom: 14px;
  padding: 20px 14px;
  transition: 0.5s;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`

export const BlueText = styled(Typography)`
  && {
    color: #1e88e5;
  }
`
