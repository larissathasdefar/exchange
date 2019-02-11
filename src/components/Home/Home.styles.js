import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

export const Container = styled(Paper)`
  max-width: calc(1000px - 40px);
  margin: 0 auto;
  padding: 20px 14px;
`

export const ExchangeTo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px;
`
