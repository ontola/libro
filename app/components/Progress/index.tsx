import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

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
  progress: {
    borderRadius: 10,
    height: 10,
  },
}));

interface ProgressProps {
  color?: 'primary' | 'secondary';
  detail?: boolean;
  endSpacing?: boolean;
  height?: string;
  max: number;
  maxLabel?: boolean;
  maxWidth?: string;
  min: number;
  minLabel?: boolean;
  progressLabel?: boolean;
  value: number;
}

const Progress = ({
  color,
  detail,
  endSpacing,
  height,
  max,
  maxLabel,
  maxWidth,
  min,
  minLabel,
  progressLabel,
  value,
}: ProgressProps): JSX.Element => {
  const classes = useStyles();
  const className = clsx({
    [classes.detail]: detail,
    [classes.endSpacing]: endSpacing,
  });

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
      {minLabel && (
        <div style={{ float: 'left' }}>
          <Heading size={HeadingSize.LG}>
            {min}
          </Heading>
        </div>
      )}
      {(progressLabel || maxLabel) && (
        <div style={{ float: 'right' }}>
          <Heading size={HeadingSize.LG}>
            {max}
          </Heading>
        </div>
      )}
      {progressLabel && (
        <div style={{ float: 'right' }}>
          <Heading size={HeadingSize.LG}>
            {`${value}/`}
          </Heading>
        </div>
      )}
    </div>
  );
};

export default Progress;
