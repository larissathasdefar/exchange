import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export const Container = styled(Paper)`
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 14px;
`

export const Content = styled.div`
  padding: 20px 14px;
  background: linear-gradient(190deg, #9d4583 0%, #3377e4 100%);
`

export const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
`

export const WhiteText = styled(Typography)`
  color: #FFFFFF !important;
`
