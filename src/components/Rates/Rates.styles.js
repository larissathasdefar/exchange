import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

export const Container = styled(Paper)`
  padding: 20px 0px;
  opacity: 0.7;
  min-width: 275px;
  max-height: 442px;
  overflow: auto;
  transition: 0.5s;

  &:hover {
    opacity: 1;
  }
`
