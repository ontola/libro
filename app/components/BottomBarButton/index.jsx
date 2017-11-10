import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import Button from '../Button';

import './BottomBarButton.scss';

const propTypes = {
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
  // True for links that are leveled higher than others
  isIndex: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
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
      {icon &&
      <div className="BottomBarButton__icon">
        <FontAwesome name={icon} />
      </div>}
      {imageUrl &&
      <div className="BottomBarButton__image-wrapper">
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
          activeClassName="BottomBarButton--active"
          onlyActiveOnIndex={isIndex}
          to={to}
        >
          {LinkContent}
        </Link>}
      {onClick &&
        <Button
          plain
          onClick={() => onClick()}
        >
          {LinkContent}
        </Button>}
    </div>
  );
};

BottomBarButton.propTypes = propTypes;

export default BottomBarButton;
