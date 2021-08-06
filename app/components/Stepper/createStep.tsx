import {
  Step,
  StepButton,
  StepClasskey,
  StepIconProps,
  StepLabel,
  StepLabelClasskey,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import React from 'react';

import { StepIcon } from './StepIcon';

export interface StepProps {
  key: string;
  stepNumber: number;
  totalSteps: number;
  stepOverrideClasses: Partial<ClassNameMap<StepClasskey>>;
  stepLabelOverrideClasses: Partial<ClassNameMap<StepLabelClasskey>>;
  children?: React.ReactNode[];
  icon?: React.ReactElement;
  onClick: (e: React.MouseEvent) => void;
}

export const createStep = ({
  key,
  stepNumber,
  totalSteps,
  stepLabelOverrideClasses,
  stepOverrideClasses,
  children,
  icon,
  onClick,
}: StepProps): JSX.Element => (
  <Step
    classes={stepOverrideClasses}
    key={key}
  >
    <StepButton
      disableTouchRipple
      onClick={onClick}
    >
      <StepLabel
        StepIconComponent={StepIcon}
        StepIconProps={{
          itemNumber: stepNumber,
          totalSteps,
          ...(icon ? { icon } : {}),
        } as StepIconProps}
        classes={stepLabelOverrideClasses}
      >
        {children ?? null}
      </StepLabel>
    </StepButton>
  </Step>
);
