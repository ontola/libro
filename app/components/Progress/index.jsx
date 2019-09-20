import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const ProgressWithRadius = withStyles({
  root: {
    borderRadius: 10,
    height: 10,
    marginBottom: '1em',
    maxWidth: '10em',
  },
})(LinearProgress);

const Progress = ({
  max,
  min,
  value,
}) => (
  <ProgressWithRadius value={100 * (value - min) / (max - min)} variant="determinate" />
);

Progress.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.number,
};

export default Progress;
