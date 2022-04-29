import LinearProgress from '@mui/material/LinearProgress';
import makeStyles from '@mui/styles/makeStyles';
import { ClassNameMap } from '@mui/styles/withStyles/withStyles';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

import Heading, { HeadingSize } from '../Heading';

const useStyles = makeStyles(() => ({
  detail: {
    '& .MuiLinearProgress-root': {
      height: 8,
    },
    display: 'inline-block',
    width: '3em',
  },
  endSpacing: {
    marginBottom: '1em',
  },
  labelInner: {
    display: 'inline-block',
  },
  labelWrapper: {
    float: 'right',
  },
  progress: {
    borderRadius: 10,
    height: 10,
  },
}));

export type LabelFormatter = (value: number, max: number) => ReactNode;

export interface ProgressProps {
  color?: 'primary' | 'secondary';
  detail?: boolean;
  endSpacing?: boolean;
  formatLabel?: LabelFormatter;
  height?: string;
  max: number;
  maxWidth?: string;
  min: number;
  progressLabel?: boolean;
  value: number;
}

const progressFormatter = (classes: ClassNameMap) => (value: number, max: number) => (
  <div className={classes.labelWrapper}>
    <Heading size={HeadingSize.LG}>
      <div className={classes.labelInner}>
        {value}
      </div>
      /
      <div className={classes.labelInner}>
        {max}
      </div>
    </Heading>
  </div>
);

const Progress = ({
  color,
  detail,
  endSpacing,
  formatLabel,
  height,
  max,
  maxWidth,
  min,
  progressLabel,
  value,
}: ProgressProps): JSX.Element => {
  const classes = useStyles();
  const className = clsx({
    [classes.detail]: detail,
    [classes.endSpacing]: endSpacing,
  });
  const formatter = progressLabel ? progressFormatter(classes) : formatLabel;

  return (
    <div className={className}>
      <LinearProgress
        className={classes.progress}
        color={color}
        style={{
          height,
          maxWidth,
        }}
        value={100 * ((Math.min(value, max) - min) / (max - min))}
        variant="determinate"
      />
      {formatter && formatter(value, max)}
    </div>
  );
};

export default Progress;
