import classNames from 'classnames';
import './SideBarLink.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {
} from 'components';

const propTypes = {
  bold: PropTypes.bool,
  label: PropTypes.string,
  imageUrl: PropTypes.string,
  icon: PropTypes.string,
  // True for links that are leveled higher than others
  isIndex: PropTypes.bool,
  to: PropTypes.any,
};

const SideBarLink = ({
  bold,
  label,
  icon,
  imageUrl,
  isIndex,
  to,
}) => {
  const classes = classNames({
    SideBarLink: true,
    'SideBarLink--bold': bold,
  });

  return (
    <div className={classes}>
      <Link
        to={to}
        activeClassName="SideBarLink--active"
        onlyActiveOnIndex={isIndex}
      >
        {icon && <div className="SideBarLink__icon">
          <FontAwesome name={icon} />
        </div>}
        {imageUrl && <div className="SideBarLink__image-wrapper">
          <div
            className="SideBarLink__image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>}
        <div className="SideBarLink__label">
          {label}
        </div>
      </Link>
    </div>
  );
};

SideBarLink.propTypes = propTypes;

export default SideBarLink;
