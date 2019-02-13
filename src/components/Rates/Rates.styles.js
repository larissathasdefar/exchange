import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import NativeSelect from '@material-ui/core/NativeSelect'

export const Container = styled(Paper)`
  padding: 20px 0px;
  opacity: 0.7;
  min-width: 275px;
  max-height: 442px;
  overflow: auto;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    opacity: 1;
  }
`

export const MargedButton = styled(Button)`
  && {
    margin: 16px 6px;
    min-height: 36px;
  }
`

export const SelectField = styled(NativeSelect)`
  min-width: 200px;
  max-width: 280px;
`

export const SelectContainer = styled.div`
  margin: 8px 0px;
`

export const Label = styled(Typography)`
  && {
    ${({ error }) => (error ? 'color: #e53935;' : '')}
  }
`
