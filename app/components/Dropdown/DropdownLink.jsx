import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  icon: PropTypes.string,
  url: PropTypes.string,
  children: PropTypes.node,
};

const DropdownLink = ({
  icon,
  url,
  children,
}) => (
  <a className="DropdownLink" href={url}>
    {icon && <FontAwesome className="DropdownLink__icon" name={icon} />}
    <span className={icon && 'DropdownLink__text--icon-left'}>{children}</span>
  </a>
);

DropdownLink.propTypes = propTypes;

export default DropdownLink;
