import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import NativeSelect from '@material-ui/core/NativeSelect'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'

export const Container = styled(Paper)`
  padding: 20px 0px;
  opacity: 0.7;
  min-width: 318px;
  max-height: 442px;
  overflow: auto;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;

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

export const RateContainer = styled(TableRow)`
  &:hover td:nth-child(2) > div {
    position: relative;
    margin-right: 50px;
    margin-left: -50px;
  }
  &:hover td:nth-child(2) > button {
    opacity: 1;
  }
`

export const Rate = styled.div`
  transition: 0.6s;
  z-index: 10;
`

export const DeleteButton = styled(IconButton)`
  && {
    transition: 0.5s;
    position: absolute;
    margin-left: -34px;
    margin-top: -48px;
    opacity: 0;
    z-index: 5;
  }
`
