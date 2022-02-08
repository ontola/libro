import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { Flag } from '@material-ui/icons';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import { LaxNode } from 'link-redux';
import React from 'react';

import form from '../../../../ontology/form';
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

  const onFlagClick = () => onStepClick(form.ns('Flow/SubmissionScreen'));

  return (
    <Stepper
      activeStep={currentIndex}
      classes={stepperClasses}
      connector={<StepConnector classes={connectorClasses} />}
      data-testid="flow-stepper"
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
        data-testid="step-flag"
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
