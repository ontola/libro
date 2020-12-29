import { SomeNode } from 'link-lib';
import React, { useState } from 'react';

import CoverImage from '../CoverImage';
import CoverImageSlider from '../CoverImageSlider';

interface PropTypes {
  children: (props: any) => any;
  file: string;
  imagePositionYShape: SomeNode;
}

const DropzoneInnerPositionY: React.FC<PropTypes> = ({
  children,
  file,
  imagePositionYShape,
}) => {
  const [positionY, setPositionY] = useState(0);
  const onSliderChange = React.useCallback((_: any, newValue: number | number[]) => {
    const val = Array.isArray(newValue) ? newValue[0] : newValue;

    setPositionY(100 - val);
  }, []);

  return (
    <React.Fragment>
      {children(
        <div style={{ flexGrow: 1 }}>
          <CoverImage
            positionY={positionY}
            url={file}
          />
        </div>,
      )}
      <CoverImageSlider
        imagePositionYShape={imagePositionYShape}
        value={positionY}
        onChange={onSliderChange}
      />
    </React.Fragment>
  );
};

export default DropzoneInnerPositionY;
