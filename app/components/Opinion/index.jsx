import './opinion.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  side: PropTypes.oneOf(['yes', 'no']).isRequired,
  owner: PropTypes.string,
  msg: PropTypes.string,
};

const defaultProps = {
  side: '',
  owner: '',
  msg: '',
};

const Opinion = ({ side, owner }) => (
  <div className={`opinion opinion--${side}`}>
    <img src={`/static/icon-${owner}.png`} alt={owner} />
  </div>
);

Opinion.propTypes = propTypes;
Opinion.defaultProps = defaultProps;

export default Opinion;
