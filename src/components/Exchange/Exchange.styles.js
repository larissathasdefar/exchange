import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SwapIcon from '@material-ui/icons/SwapVert'

export const Container = styled(Paper)`
  max-width: calc(1000px - 40px);
  margin: 0 auto;
  padding: 20px 14px;
`

export const CurrencyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`

export const Currency = styled.div`
  margin-right: ${(({ margin }) => margin)}px;
`

export const TextInput = styled(TextField)`
  width: 120px;
  float: right;
`

export const Complement = styled.div`
  padding-left: 40px;
  min-width: 150px;
`

export const StepContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
  min-width: 438px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Cancel = styled(Button)`
  margin-right: 12px !important;
`

export const ExchangeIcon = styled(SwapIcon)`
  && {
    margin: 0 auto;
    display: block;
    font-size: 32px;
    color: #438ac3;
  }
`