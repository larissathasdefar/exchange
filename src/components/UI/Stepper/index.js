import React, { PureComponent, Fragment } from 'react'
import _ from 'prop-types'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Typography from '@material-ui/core/Typography'
import {
  Container,
  Content,
  StepContainer,
  Progress,
  SmallButton,
} from './Stepper.styles'

// If the start step was 3 and the user has only 2 steps,
// this will return the 3th step item instead of an error
const reduceExtraSteps = ({ start, steps }) => (
  steps.length === 1
    ? 0
    : start >= steps.length
      ? start % steps.length
      : start
)

class CustomStepper extends PureComponent {
  state = {
    activeStep: reduceExtraSteps(this.props),
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
    const { steps, align, textStyle } = this.props
    const { activeStep } = this.state
    return (
      <Content>
        <Typography align={align} variant="h4" style={textStyle}>
          { steps[activeStep].title }
        </Typography>
        <Typography align={align} variant="caption" style={textStyle}>
          { steps[activeStep].subtitle }
        </Typography>
      </Content>
    )
  }

  render() {
    const { activeStep } = this.state
    const { steps, renderStep, iconStyle } = this.props
    const maxSteps = steps.length
    return (
      <Container>
        <StepContainer>
          <SmallButton onClick={this.handleBack}>
            <KeyboardArrowLeft style={iconStyle} />
          </SmallButton>
          {
            renderStep
              ? renderStep(steps[activeStep])
              : this.renderActualStep()
          }
          <SmallButton onClick={this.handleNext}>
            <KeyboardArrowRight style={iconStyle} />
          </SmallButton>
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
}

CustomStepper.propTypes = {
  steps: _.arrayOf(
    _.shape({
      title: _.string.isRequired,
      subtitle: _.string.isRequired,
    }),
  ).isRequired,
  align: _.string,
  textStyle: _.shape({}),
  iconStyle: _.shape({}),
  renderStep: _.func,
  start: _.number,
  onChangeStep: _.func,
}

export default CustomStepper
