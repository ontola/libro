import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};

const SideBarLinkIcon = ({ children }) => (
  <div className="SideBarLink__icon">{children}</div>
);

SideBarLinkIcon.propTypes = propTypes;

export default SideBarLinkIcon;
