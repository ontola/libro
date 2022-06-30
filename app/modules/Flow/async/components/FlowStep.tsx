import {
  Step,
  StepLabel,
  StepProps, 
} from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { useField } from 'react-final-form';

import { useFlowStepStyles } from '../hooks/useFlowStyles';

interface FlowStepProps extends StepProps {
  fieldHash: string;
  fieldIndex: number;
  activateIndex: (index: number) => void;
  pageCount: number;
}

const FlowStep = ({
  activateIndex,
  fieldHash,
  fieldIndex,
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
    activateIndex(fieldIndex);
  }, [activateIndex, fieldIndex]);

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
