import styled from 'styled-components'
import MobileStepper from '@material-ui/core/MobileStepper'

export const Container = styled.div`
  min-height: 150px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
`

export const Content = styled.div`
  padding: 12px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Progress = styled(MobileStepper)`
  background-color: transparent !important;
  justify-content: center !important;
`
