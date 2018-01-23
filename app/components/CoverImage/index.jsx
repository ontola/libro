import React from 'react';
import PropTypes from 'prop-types';

import './CoverImage.scss';

const propTypes = {
  positionY: PropTypes.number,
  url: PropTypes.string.isRequired,
};

/**
 * Just a wrapper component
 * @returns {component} Component
 */
const CoverImage = ({
  url,
  positionY,
}) => (
  <div className="CoverImage__wrapper" >
    <div
      className="CoverImage__child"
      style={{
        backgroundImage: `url(${url})`,
        backgroundPositionY: `${positionY}%`,
      }}
    />
  </div>
);

CoverImage.propTypes = propTypes;

export default CoverImage;
