import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};

const SideBarLinkLabel = ({ children }) => (
  <div className="SideBarLink__label">{children}</div>
);

SideBarLinkLabel.propTypes = propTypes;

export default SideBarLinkLabel;
