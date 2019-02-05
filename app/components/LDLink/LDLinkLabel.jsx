
import PropTypes from 'prop-types';
import React from 'react';

import './LDLink.scss';

const LDLinkLabel = ({ children }) => (
  <span className="LDLinkLabel">
    {children}
  </span>
);

LDLinkLabel.propTypes = {
  children: PropTypes.node,
};

export default LDLinkLabel;
