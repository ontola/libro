import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  url: PropTypes.string,
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
