import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';

import './Opinion.scss';

const propTypes = {
  owner: PropTypes.string,
  side: PropTypes.oneOf(['yes', 'no']).isRequired,
};

const defaultProps = {
  owner: '',
};

const Opinion = ({ side, owner }) => (
  <div className={`Opinion Opinion--${side}`}>
    <Link to={{ query: { opinion: owner } }}>
      <img alt={owner} src={`/static/logos/${owner}.png`} />
    </Link>
  </div>
);

Opinion.propTypes = propTypes;
Opinion.defaultProps = defaultProps;

export default Opinion;
