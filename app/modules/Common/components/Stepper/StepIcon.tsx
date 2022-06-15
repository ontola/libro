import { StepIconProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

import { LibroTheme } from '../../../../themes/themes';

export interface CustomStepIconProps extends StepIconProps {
  totalSteps: number;
  itemNumber: number;
}

const useStepIconStyles = makeStyles((theme: LibroTheme) => ({
  stepBackground: {
    '&:hover': {
      filter: 'brightness(.8)',
    },

    '--left-inset': (props: CustomStepIconProps) => props.itemNumber === 0 ? '0%' : 'var(--total-inset)',
    '--right-inset': (props: CustomStepIconProps) => props.totalSteps === props.itemNumber + 1 ? '100%' : 'calc(100% - var(--total-inset))',
    '--total-inset': 'min(10px, 7%)',
    alignItems: 'center',
    backgroundColor: (props: CustomStepIconProps) => props.active ? theme.palette.primary.main : 'lightgray',
    clipPath: 'polygon(var(--right-inset) 0%, 100% 50%, var(--right-inset) 100%, 0% 100%, var(--left-inset) 50.00%, 0% 0%)',
    color: (props: CustomStepIconProps) => props.active ? theme.palette.primary.contrastText : 'black',
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    height: '1.9em',
    justifyContent: 'center',
    width: 'max(20px, 100%)',
  },
}));

export const StepIcon = (props: CustomStepIconProps): JSX.Element => {
  const classes = useStepIconStyles(props);

  return (
    <div className={classes.stepBackground}>
      {props.icon}
    </div>
  );
};
