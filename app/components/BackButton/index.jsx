import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import Link from '../Link';

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
