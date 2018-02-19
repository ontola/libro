import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { retrievePath } from '../../helpers/iris';
import Image from '../Image';

const propTypes = {
  children: PropTypes.node,
  icon: linkType,
  url: linkType,
};

const DropdownLink = ({
  icon,
  url,
  children,
}) => {
  const inner = (
    <Fragment>
      {icon && <Image className="DropdownLink__icon" linkedProp={icon} />}
      <span className={icon && 'DropdownLink__text--icon-left'}>{children}</span>
    </Fragment>
  );

  if (url) {
    return <Link className="DropdownLink" to={retrievePath(url.value)}>{inner}</Link>;
  }
  return <div className="DropdownLink">{inner}</div>;
};
DropdownLink.propTypes = propTypes;

export default DropdownLink;
