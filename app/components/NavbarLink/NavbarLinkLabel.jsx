import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};

const NavbarLinkLabel = ({ children }) => (
  <div className="NavbarLink__label">
    <span className="NavbarLink__truncated-label">{children}</span>
  </div>
);

NavbarLinkLabel.propTypes = propTypes;

export default NavbarLinkLabel;
