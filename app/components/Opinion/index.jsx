import './Opinion.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
  <div className={`Opinion Opinion--${side}`}>
    <Link to={{ pathname: location.pathname, query: { opinion: owner } }}>
      <img src={`/static/logos/${owner}.png`} alt={owner} />
    </Link>
  </div>
);

Opinion.propTypes = propTypes;
Opinion.defaultProps = defaultProps;

export default Opinion;
