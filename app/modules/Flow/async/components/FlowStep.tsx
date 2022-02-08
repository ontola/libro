import Step from '@material-ui/core/Step';
import { StepProps } from '@material-ui/core/Step/Step';
import StepLabel from '@material-ui/core/StepLabel';
import clsx from 'clsx';
import React from 'react';
import { useField } from 'react-final-form';

import { useFlowStepStyles } from '../hooks/useFlowStyles';

interface FlowStepProps extends StepProps {
  fieldHash: string;
  onStepClick: (hash: string) => void;
  pageCount: number;
}

const FlowStep = ({
  fieldHash,
  onStepClick,
  pageCount,
  ...otherProps
}: FlowStepProps): JSX.Element | null => {
  const classes = useFlowStepStyles({ pageCount });

  const fieldState = useField(fieldHash, {
    subscription: {
      touched: true,
      valid: true,
    },
  });

  const handleClick = React.useCallback(() => {
    onStepClick(fieldHash);
  }, [fieldHash]);

  const { valid, touched } = fieldState.meta;

  const stepClassName = clsx({
    [classes.step]: true,
    [classes.stepBadge]: touched,
    [classes.stepValid]: valid,
  });

  const completed = valid && touched;

  return (
    <Step
      {...otherProps}
      classes={{
        completed: stepClassName,
        root: stepClassName,
      }}
      completed={completed}
      data-testid={completed ? `completed-step-${fieldHash}` : `step-${fieldHash}`}
      onClick={handleClick}
    >
      <StepLabel>
        {' '}
      </StepLabel>
    </Step>
  );
};

export default FlowStep;
