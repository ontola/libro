import React from 'react';

import './CoverImage.scss';

interface PropTypes {
  positionY: number | string;
  url: string;
}

/**
 * Just a wrapper component
 * @returns {component} Component
 */
const CoverImage: React.FC<PropTypes> = ({
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
    />
  </div>
);

export default CoverImage;
