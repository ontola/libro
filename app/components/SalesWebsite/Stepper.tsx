import { useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';
import Image from '../Image';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  image: {
    borderRadius: '50%',
    height: 100,
    padding: 20,
  },
  imageContainer: {
    flex: 1,
  },
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      margin: -25,
    },
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  root: {
    width: '100%',
  },
}));

export interface StepperProps {
  imageUrl: any,
  steps: string[],
}

// function getSteps() {
//   return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
// }

function getStepContent(step: number) {
  switch (step) {
  case 0:
    return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
  case 1:
    return 'An ad group contains one or more ads which target a shared set of keywords.';
  case 2:
    return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
  default:
    return 'Unknown step';
  }
}

export const VerticalLinearStepper = ({
  imageUrl,
  steps,
}: StepperProps): JSX.Element => {
  const classes = useStyles();
  const styles = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  // const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const imageView = (
    <div className={classes.imageWrapper}>
      <Image
        className={classes.image}
        linkedProp={imageUrl}
      />
    </div>
  );

  const emptyView = null;

  const image = useMediaQuery(styles.breakpoints.down('sm'))
    ? emptyView : imageView;

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            {image}
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    className={classes.button}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>

                </div>
              </div>
            </StepContent>

          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square className={classes.resetContainer} elevation={0}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button className={classes.button} onClick={handleReset}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
};
