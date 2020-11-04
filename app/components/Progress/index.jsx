import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from '../Heading';

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

const Progress = ({
  color,
  detail,
  endSpacing,
  height,
  labels,
  max,
  maxWidth,
  min,
  value,
}) => {
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
        value={100 * ((value - min) / (max - min))}
        variant="determinate"
      />
      {labels && <div style={{ float: 'left' }}><Heading size="2">{min}</Heading></div>}
      {labels && <div style={{ float: 'right' }}><Heading size="2">{max}</Heading></div>}
    </div>
  );
};

Progress.propTypes = {
  color: PropTypes.string,
  detail: PropTypes.bool,
  endSpacing: PropTypes.bool,
  height: PropTypes.string,
  labels: PropTypes.bool,
  max: PropTypes.number,
  maxWidth: PropTypes.string,
  min: PropTypes.number,
  value: PropTypes.number,
};

export default Progress;
