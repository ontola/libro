import { Flag } from '@mui/icons-material';
import {
  Step,
  StepConnector,
  StepLabel,
  Stepper,
} from '@mui/material';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import React from 'react';

import { useFlowStepperStyles } from '../hooks/useFlowStyles';

import FlowStep from './FlowStep';

export interface FlowStepperProps {
  activateIndex: (index: number) => void;
  currentIndex: number;
  hashedFields: Map<string, SomeNode>;
}

export const FlowStepper = ({
  currentIndex,
  hashedFields,
  activateIndex,
}: FlowStepperProps): JSX.Element => {
  const hashes = Array.from(hashedFields.keys());

  const styleProps = React.useMemo(() => ({ pageCount: hashes.length }), [hashes.length]);
  const classes = useFlowStepperStyles(styleProps);
  const stepperClasses = React.useMemo(() => ({ root: classes.stepperRoot }), [classes.stepperRoot]);
  const connectorClasses = React.useMemo(() => ({ root: classes.stepConnector }), [classes.stepConnector]);

  const submitStepClasses = clsx({
    [classes.submitStep]: true,
    [classes.submitStepActive]: currentIndex === hashes.length,
  });

  return (
    <Stepper
      activeStep={currentIndex}
      classes={stepperClasses}
      connector={<StepConnector classes={connectorClasses} />}
      data-testid="flow-stepper"
      orientation="vertical"
    >
      {hashes.map((fieldHash, index) => (
        <FlowStep
          activateIndex={activateIndex}
          fieldHash={fieldHash}
          fieldIndex={index}
          key={fieldHash}
          pageCount={hashes.length}
        />
      ))}
      <Step
        classes={{ root: classes.step }}
        data-testid="step-flag"
        onClick={() => activateIndex(hashes.length)}
      >
        <StepLabel
          StepIconComponent={Flag}
          StepIconProps={{
            classes: {
              root: submitStepClasses,
            },
          }}
        >
          {' '}
        </StepLabel>
      </Step>
    </Stepper>
  );
};
