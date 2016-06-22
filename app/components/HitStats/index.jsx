// @flow
import './hitstats.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  hits: PropTypes.number,
};

const defaultProps = {
  hits: null,
};

const HitStats = ({ hits }) => (
  <div className="sk-hits-stats">
    <div className="sk-hits-stats__info">{`${hits} resultaten`}</div>
  </div>
);

HitStats.propTypes = propTypes;
HitStats.defaultProps = defaultProps;

export default HitStats;
