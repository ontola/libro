import {
  Stepper as MUIStepper,
  StepConnector,
  StepperClasskey,
  makeStyles,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { LibroTheme } from '../../themes/themes';

import { createStep } from './createStep';

export interface StepperProps<T> {
  items: T[];
  itemToKey: (item: T) => string;
  activeStep: number;
  renderStepLabel: (item: T) => JSX.Element;
  createStepOnClick: (item: T) => (e: React.MouseEvent) => void;
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
    },
  },
  labelContainer: {
    [theme.breakpoints.down('sm')]: {
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
      onClick: createStepOnClick(item),
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
        {showNewStepButton ? renderNewStep(): null}
      </MUIStepper>
    );
  };

  return Stepper;
}

