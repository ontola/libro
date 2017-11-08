import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import './BackButton.scss';

const propTypes = {
  children: PropTypes.node,
  link: PropTypes.string.isRequired,
};

const BackButton = ({
  children,
  link,
}) => (
  <Link className="BackButton" to={link}>
    <FontAwesome name="th" />{' '}
    {children}
  </Link>
);

BackButton.propTypes = propTypes;

export default BackButton;
