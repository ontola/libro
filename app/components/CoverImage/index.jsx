import React from 'react';
import PropTypes from 'prop-types';

import './CoverImage.scss';

const propTypes = {
  children: PropTypes.node,
  positionY: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  url: PropTypes.string.isRequired,
};

/**
 * Just a wrapper component
 * @returns {component} Component
 */
const CoverImage = ({
  children,
  url,
  positionY,
}) => (
  <div className="CoverImage__wrapper">
    <div
      className="CoverImage__child"
      data-testid="coverImage"
      style={{
        backgroundImage: `url(${url})`,
        backgroundPositionY: positionY ? `${positionY}%` : undefined,
      }}
    >
      {children}
    </div>
  </div>
);

CoverImage.propTypes = propTypes;

export default CoverImage;
