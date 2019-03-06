import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Link from '../Link';
import { isDifferentOrigin, retrievePath } from '../../helpers/iris';
import Image from '../Image';

const propTypes = {
  action: PropTypes.func,
  children: PropTypes.node,
  icon: linkType,
  url: linkType,
};

const DropdownLink = ({
  action,
  children,
  icon,
  url,
}) => {
  const inner = (
    <Fragment>
      {icon && <Image className="DropdownLink__icon" linkedProp={icon} />}
      <span className={icon && 'DropdownLink__text--icon-left'}>{children}</span>
    </Fragment>
  );

  if (!action && url) {
    if (isDifferentOrigin(url.value)) {
      return (
        <a
          className="DropdownLink"
          href={url.value}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          {inner}
        </a>
      );
    }
    return <Link className="DropdownLink" to={retrievePath(url.value)}>{inner}</Link>;
  }

  return (
    <div className="DropdownLink" onClick={action} onKeyUp={action}>
      {inner}
    </div>
  );
};
DropdownLink.propTypes = propTypes;

export default DropdownLink;
