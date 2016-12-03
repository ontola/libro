import './BottomBarButton.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {
} from 'components';

const propTypes = {
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
  label: PropTypes.string,
  // True for links that are leveled higher than others
  isIndex: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.function,
};

const BottomBarButton = ({
  icon,
  imageUrl,
  isIndex,
  label,
  onClick,
  to,
}) => {
  const LinkContent = (
    <div className="BottomBarButton__wrapper">
      {icon && <div className="BottomBarButton__icon">
        <FontAwesome name={icon} />
      </div>}
      {imageUrl && <div className="BottomBarButton__image-wrapper">
        <div
          className="BottomBarButton__image"
          style={{ 'background-image': `url(${imageUrl})` }}
        />
      </div>}
      <div className="BottomBarButton__text">
        {label}
      </div>
    </div>
  );

  return (
    <div className="BottomBarButton">
      {to &&
        <Link
          to={to}
          activeClassName="BottomBarButton--active"
          onlyActiveOnIndex={isIndex}
        >
          {LinkContent}
        </Link>}
      {onClick &&
        <a
          tabIndex={0}
          onClick={() => onClick()}
        >
          {LinkContent}
        </a>}
    </div>
  );
};

BottomBarButton.propTypes = propTypes;

export default BottomBarButton;
