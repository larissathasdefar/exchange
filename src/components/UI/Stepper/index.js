import React, { PureComponent, Fragment } from 'react'
import _ from 'prop-types'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Typography from '@material-ui/core/Typography'
import {
  Container,
  Content,
  StepContainer,
  Progress,
} from './Stepper.styles'

class CustomStepper extends PureComponent {
  state = {
    activeStep: this.props.start,
  }

  componentDidUpdate() {
    const { steps, onChangeStep } = this.props
    const { activeStep } = this.state
    return onChangeStep
      ? onChangeStep(activeStep, steps[activeStep])
      : null
  }

  handleNext = () => {
    const { activeStep } = this.state
    const { steps } = this.props
    const nextStep = activeStep === steps.length - 1
      ? 0
      : activeStep + 1
    this.setState({ activeStep: nextStep })
  }

  handleBack = () => {
    const { activeStep } = this.state
    const { steps } = this.props
    const nextStep = activeStep === 0
      ? steps.length - 1
      : activeStep - 1
    this.setState({ activeStep: nextStep })
  }

  renderActualStep = () => {
    const { steps, align } = this.props
    const { activeStep } = this.state
    return (
      <Content>
        <Typography align={align} variant="h4">
          { steps[activeStep].title }
        </Typography>
        <Typography align={align} variant="caption">
          { steps[activeStep].subtitle }
        </Typography>
      </Content>
    )
  }

  render() {
    const { activeStep } = this.state
    const { steps, renderStep } = this.props
    const maxSteps = steps.length
    return (
      <Container>
        <StepContainer>
          <Button onClick={this.handleBack}>
            <KeyboardArrowLeft />
          </Button>
          {
            renderStep
              ? renderStep(steps[activeStep])
              : this.renderActualStep()
          }
          <Button onClick={this.handleNext}>
            <KeyboardArrowRight />
          </Button>
        </StepContainer>
        <Progress
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
        />
      </Container>
    )
  }
}

CustomStepper.defaultProps = {
  align: 'inherit',
  start: 0,
  renderStep: undefined,
  onChangeStep: undefined,
}

CustomStepper.propTypes = {
  steps: _.arrayOf(
    _.shape({
      title: _.string.isRequired,
      subtitle: _.string.isRequired,
    }),
  ).isRequired,
  align: _.string,
  renderStep: _.func,
  start: _.number,
  onChangeStep: _.func,
}

export default CustomStepper
