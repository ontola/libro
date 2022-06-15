import { Flag } from '@mui/icons-material';
import {
  Step,
  StepConnector,
  StepLabel,
  Stepper, 
} from '@mui/material';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import { LaxNode } from 'link-redux';
import React from 'react';

import { useFlowStepperStyles } from '../hooks/useFlowStyles';

import FlowStep from './FlowStep';

export interface FlowStepperProps {
  currentIndex: number;
  hashedFields: Map<string, SomeNode>;
  onStepClick: (field: LaxNode) => void;
}

export const FlowStepper = ({
  currentIndex,
  hashedFields,
  onStepClick,
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

  const handleClick = React.useCallback((hash: string) => {
    const field = hashedFields.get(hash);
    onStepClick(field);
  }, [hashedFields]);

  const onFlagClick = () => onStepClick(undefined);

  return (
    <Stepper
      activeStep={currentIndex}
      classes={stepperClasses}
      connector={<StepConnector classes={connectorClasses} />}
      orientation="vertical"
    >
      {hashes.map((fieldHash) => (
        <FlowStep
          fieldHash={fieldHash}
          key={fieldHash}
          pageCount={hashes.length}
          onStepClick={handleClick}
        />
      ))}
      <Step
        classes={{ root: classes.step }}
        onClick={onFlagClick}
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
