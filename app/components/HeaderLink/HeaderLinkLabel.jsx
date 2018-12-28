import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};

const HeaderLinkLabel = ({ children }) => (
  <div className="HeaderLink__label">
    <span className="HeaderLink__truncated-label">{children}</span>
  </div>
);

HeaderLinkLabel.propTypes = propTypes;

export default HeaderLinkLabel;
