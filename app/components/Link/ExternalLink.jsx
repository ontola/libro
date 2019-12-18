import PropTypes from 'prop-types';
import React from 'react';

const ExternalLink = ({ children, ...otherProps }) => (
  <a
    {...otherProps}
    rel="nofollow noopener noreferrer"
    target="_blank"
  >
    {children}
  </a>

);

ExternalLink.propTypes = {
  children: PropTypes.element,
};

export default ExternalLink;
