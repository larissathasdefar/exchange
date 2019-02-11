import styled from 'styled-components'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'

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
  align-items: center;
`

export const Progress = styled(MobileStepper)`
  background-color: transparent !important;
  justify-content: center !important;
`

export const SmallButton = styled(Button)`
  && {
    min-width: 32px;
  }
`
