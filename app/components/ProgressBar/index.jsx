import './ProgressBar.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  context: PropTypes.string,
  completed: PropTypes.number,
  total: PropTypes.number.isRequired,
};

const defaultProps = {
  completed: 0,
  total: 0,
};

const PERCENTAGE = 100;
const barWidth = (completed, total) => completed / total * PERCENTAGE;

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
    <div className="ProgressBar__bar-background" />
    <div className="ProgressBar__context">{context}</div>
    <div className="ProgressBar__completion-text">{completed}/{total}</div>
  </div>
);

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

export default ProgressBar;
