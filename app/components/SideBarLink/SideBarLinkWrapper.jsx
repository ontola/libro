import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node,
};

const SideBarLinkWrapper = ({ children, bold }) => {
  const classes = classNames({
    SideBarLink: true,
    'SideBarLink--bold': bold,
  });

  return <div className={classes} >{children}</div>;
};

SideBarLinkWrapper.propTypes = propTypes;

export default SideBarLinkWrapper;
