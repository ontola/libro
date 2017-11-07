import './BackButton.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

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
