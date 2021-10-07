import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { Flag } from '@material-ui/icons';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import { LaxNode } from 'link-redux';
import React from 'react';

import { useFlowStyles } from '../hooks/useFlowStyles';

import FlowStep from './FlowStep';

export interface FlowStepperProps {
  currentIndex: number;
  pages: SomeNode[];
  onStepClick: (field: LaxNode) => void;
}

export const FlowStepper = ({
  currentIndex,
  pages,
  onStepClick,
}: FlowStepperProps): JSX.Element => {
  const classes = useFlowStyles({ pageCount: pages.length });
  const submitStepClasses = clsx({
    [classes.submitStep]: true,
    [classes.submitStepActive]: currentIndex === pages.length,
  });

  const handleClick = (field: LaxNode) => () => onStepClick(field);

  return (
    <Stepper
      activeStep={currentIndex}
      classes={{ root: classes.stepperRoot }}
      connector={<StepConnector classes={{ root: classes.stepConnector }} />}
      orientation="vertical"
    >
      {pages.map((page) => (
        <FlowStep
          handleClick={handleClick(page)}
          key={page.value}
          page={page}
          pageCount={pages.length}
        />
      ))}
      <Step
        classes={{ root: classes.step }}
        onClick={handleClick(undefined)}
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
