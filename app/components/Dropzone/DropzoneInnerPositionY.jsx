import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import CoverImage from '../CoverImage';
import CoverImageSlider from '../CoverImageSlider';

const DropzoneInnerPositionY = ({
  children,
  file,
  imagePositionYShape,
}) => {
  const [positionY, setPositionY] = useState(0);
  const onSliderChange = (event, value) => setPositionY(100 - value);

  return (
    <React.Fragment>
      {children(
        <div style={{ flexGrow: 1 }}>
          <CoverImage
            positionY={positionY}
            url={file}
          />
        </div>
      )}
      <CoverImageSlider
        imagePositionYShape={imagePositionYShape}
        value={positionY}
        onChange={onSliderChange}
      />
    </React.Fragment>
  );
};

DropzoneInnerPositionY.propTypes = {
  children: PropTypes.func,
  file: PropTypes.string,
  imagePositionYShape: linkType,
};

export default DropzoneInnerPositionY;
