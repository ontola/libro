// @flow
import './VoteMatchProgress.scss';
import React, { PropTypes } from 'react';

const PERCENTAGE = 100;

const propTypes = {
  compareTo: PropTypes.string,
  completedMotions: PropTypes.number,
  totalMotions: PropTypes.number,
};

const defaultProps = {
  completedMotions: 0,
};

const VoteMatchProgress = ({
  completedMotions,
  totalMotions,
  compareTo,
}) => {
  const completionFactor = completedMotions / totalMotions;

  const style = {
    width: `${completionFactor * PERCENTAGE}%`,
  };

  return (
    <div className="VoteMatchProgress">
      <div className="VoteMatchProgress__bar" style={style} />
      <div className="VoteMatchProgress__bar__background" />
      <div className="VoteMatchProgress__context">VoteMatch - {compareTo} </div>
      <div className="VoteMatchProgress__completionText">{completedMotions} / {totalMotions}</div>
    </div>
  );
};

VoteMatchProgress.propTypes = propTypes;
VoteMatchProgress.defaultProps = defaultProps;

export default VoteMatchProgress;
