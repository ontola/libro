import {
  Stepper as MUIStepper,
  StepConnector,
  StepperClasskey,
} from '@mui/material';
import { ClassNameMap, makeStyles } from '@mui/styles';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { BreakPoints, LibroTheme } from '../../../Kernel/lib/themes';

import { createStep } from './createStep';

export type CreateStepOnClick<T> = (item: T, index: number) => (e: React.MouseEvent) => void;

export interface StepperProps<T> {
  items: T[];
  itemToKey: (item: T) => string;
  activeStep: number;
  renderStepLabel: (item: T) => JSX.Element;
  createStepOnClick: CreateStepOnClick<T>;
  showNewStepButton?: boolean;
  onNewStepClick?: (e: React.MouseEvent) => void;
  overrideClasses?: Partial<ClassNameMap<StepperClasskey>>;
}

const useStepOverrideStyle = makeStyles(() => ({
  root: {
    '&:first-child': {
      paddingLeft: '0px',
    },
    '&:last-child': {
      paddingRight: '0px',
    },

    padding: '3px',
  },
}));

const useStepLabelOverrideStyles = makeStyles((theme: LibroTheme) => ({
  // FIX: the active key needs to be present for MUI to override the active label styling (defined in label).
  active: {},
  alternativeLabel: {
    color: 'gray',
    fontWeight: 'bold',
    width: '100%',
  },
  label: {
    '&$active': {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
      height: '1.2em',
      marginLeft: '-0.1em',
      marginTop: '-0.1em',
      width: '1.2em',
    },
  },
  labelContainer: {
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      display: 'none',
    },
  },
}));

const useStepConnectorOverrideStyles = makeStyles({
  root: {
    display: 'none',
  },
});

export function stepperBuilder<T>(): ((props: StepperProps<T>) => JSX.Element) {
  const Stepper = ({
    items,
    itemToKey,
    activeStep,
    renderStepLabel,
    createStepOnClick,
    showNewStepButton,
    onNewStepClick,
    overrideClasses,
  }: StepperProps<T>): JSX.Element => {
    const stepOverrideClasses = useStepOverrideStyle();
    const stepLabelOverrideClasses = useStepLabelOverrideStyles();
    const stepConnectorOverrideClasses = useStepConnectorOverrideStyles();
    const [totalSteps, setTotalSteps] = React.useState(items.length + Number(showNewStepButton));

    React.useEffect(() => {
      setTotalSteps(items.length + Number(showNewStepButton));
    }, [showNewStepButton]);

    const renderStep = (item: T, index: number) => createStep({
      children: [renderStepLabel(item)],
      key: itemToKey(item),
      onClick: createStepOnClick(item, index),
      stepLabelOverrideClasses: stepLabelOverrideClasses,
      stepNumber: index,
      stepOverrideClasses,
      totalSteps: totalSteps,
    });

    const renderNewStep = () => createStep({
      icon: <FontAwesome name="plus" />,
      key: 'new-step',
      onClick: onNewStepClick ? onNewStepClick : (e: React.MouseEvent) => e.preventDefault(),
      stepLabelOverrideClasses: stepLabelOverrideClasses,
      stepNumber: items.length,
      stepOverrideClasses,
      totalSteps: totalSteps,
    });

    return (
      <MUIStepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        classes={overrideClasses}
        connector={<StepConnector classes={stepConnectorOverrideClasses} />}
      >
        {items.map(renderStep)}
        {showNewStepButton ? renderNewStep() : null}
      </MUIStepper>
    );
  };

  return Stepper;
}

