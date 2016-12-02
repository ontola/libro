import './BottomBarLink.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {
} from 'components';

const propTypes = {
  label: PropTypes.string,
  imageUrl: PropTypes.string,
  icon: PropTypes.string,
  // True for links that are leveled higher than others
  isIndex: PropTypes.bool,
  to: PropTypes.function,
};

const BottomBarLink = ({
  label,
  icon,
  imageUrl,
  isIndex,
  to,
}) => (
  <div className="BottomBarLink">
    <Link
      to={to}
      activeClassName="BottomBarLink--active"
      onlyActiveOnIndex={isIndex}
    >
      {icon && <div className="BottomBarLink__icon">
        <FontAwesome name={icon} />
      </div>}
      {imageUrl && <div className="BottomBarLink__image-wrapper">
        <div
          className="BottomBarLink__image"
          style={{ 'background-image': `url(${imageUrl})` }}
        />
      </div>}
      <div className="BottomBarLink__text">
        {label}
      </div>
    </Link>
  </div>
);

BottomBarLink.propTypes = propTypes;

export default BottomBarLink;
