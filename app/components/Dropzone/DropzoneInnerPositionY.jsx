import { linkType, useResourceProperty } from 'link-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { tryParseInt } from '../../helpers/numbers';
import ontola from '../../ontology/ontola';
import CoverImage from '../CoverImage';
import CoverImageSlider from '../CoverImageSlider';

const DropzoneInnerPositionY = ({
  children,
  currentContent,
  file,
  imagePositionYShape,
  object,
}) => {
  const [targetValue] = useResourceProperty(object, ontola.imagePositionY);
  const [positionY, setPositionY] = useState(tryParseInt(targetValue));
  const onSliderChange = (event, value) => setPositionY(100 - value);

  return (
    <React.Fragment>
      {children(
        <div style={{ flexGrow: 1 }}>
          <CoverImage
            positionY={positionY}
            url={file || currentContent?.value}
          />
        </div>
      )}
      <CoverImageSlider
        imagePositionYShape={imagePositionYShape}
        object={object}
        targetValue={targetValue}
        value={positionY}
        onChange={onSliderChange}
      />
    </React.Fragment>
  );
};

DropzoneInnerPositionY.propTypes = {
  children: PropTypes.func,
  currentContent: linkType,
  file: PropTypes.string,
  imagePositionYShape: linkType,
  object: linkType,
};

export default DropzoneInnerPositionY;
