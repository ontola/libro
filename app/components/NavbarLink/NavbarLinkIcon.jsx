import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
  features: PropTypes.oneOf([
    'padded',
  ]),
};

const NavbarLinkIcon = ({ children, features }) => (
  <div className={`NavbarLink__icon ${features ? `NavbarLink__icon--${features}` : ''}`}>
    {children}
  </div>
);

NavbarLinkIcon.propTypes = propTypes;

export default NavbarLinkIcon;
