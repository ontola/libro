// @flow
import './ProgressBar.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  context: PropTypes.string,
  completed: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

const defaultProps = {
  completedMotions: 0,
};

const barWidth = (completed, total) => {
  const PERCENTAGE = 100;
  return completed / total * PERCENTAGE;
};

const ProgressBar = ({
  completed,
  total,
  context,
}) => (
  <div className="ProgressBar">
    <div
      className="ProgressBar__bar"
      style={{
        width: `${barWidth(completed, total)}%`,
      }}
    />
    <div className="ProgressBar__bar__background" />
    <div className="ProgressBar__context">{context}</div>
    <div className="ProgressBar__completionText">{completed}/{total}</div>
  </div>
);

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

export default ProgressBar;
