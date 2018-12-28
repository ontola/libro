import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};

const HeaderLinkIcon = ({ children }) => (
  <div className="HeaderLink__icon">{children}</div>
);

HeaderLinkIcon.propTypes = propTypes;

export default HeaderLinkIcon;
