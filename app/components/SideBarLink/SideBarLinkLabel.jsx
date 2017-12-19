import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};

const SideBarLinkLabel = ({ children }) => (
  <div className="SideBarLink__label">
    <p className="SideBarLink__truncatedLabel">{children}</p>
  </div>
);

SideBarLinkLabel.propTypes = propTypes;

export default SideBarLinkLabel;
