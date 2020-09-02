import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from '../Heading';

const useStyles = makeStyles(() => ({
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
  endSpacing,
  height,
  labels,
  max,
  maxWidth,
  min,
  value,
}) => {
  const classes = useStyles();

  return (
    <div className={endSpacing ? classes.endSpacing : null}>
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
  endSpacing: PropTypes.bool,
  height: PropTypes.string,
  labels: PropTypes.bool,
  max: PropTypes.number,
  maxWidth: PropTypes.string,
  min: PropTypes.number,
  value: PropTypes.number,
};

export default Progress;
