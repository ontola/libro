import React, { PropTypes } from 'react';

import { calcPercentage } from 'helpers/numbers';

import './ProgressBar.scss';

const propTypes = {
  completed: PropTypes.number,
  context: PropTypes.string,
  total: PropTypes.number.isRequired,
};

const defaultProps = {
  completed: 0,
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
        width: `${calcPercentage(completed, total)}%`,
      }}
    />
    <div className="ProgressBar__bar-background" />
    {context && <div className="ProgressBar__context">{context}</div>}
    <div className="ProgressBar__completion-text">{completed}/{total}</div>
  </div>
);

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

export default ProgressBar;
