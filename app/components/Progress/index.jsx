import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const ProgressWithRadius = withStyles({
  root: {
    borderRadius: 10,
    height: 10,
    maxWidth: '10em',
  },
})(LinearProgress);

const ProgressWithEndspacing = withStyles({
  root: {
    marginBottom: '1em',
  },
})(ProgressWithRadius);

const Progress = ({
  endSpacing,
  max,
  min,
  value,
}) => {
  const ProgressComp = endSpacing ? ProgressWithEndspacing : ProgressWithRadius;

  return (
    <ProgressComp value={100 * ((value - min) / (max - min))} variant="determinate" />
  );
};

Progress.propTypes = {
  endSpacing: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.number,
};

export default Progress;
