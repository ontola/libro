import React, { useState } from 'react';

import CoverImage from '../../../Common/components/CoverImage';
import CoverImageSlider from '../CoverImageSlider';

interface PropTypes {
  children: (props: any) => any;
  preview: string;
}

const DropzoneInnerPositionY: React.FC<PropTypes> = ({
  children,
  preview,
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
            url={preview}
          />
        </div>,
      )}
      <CoverImageSlider
        value={positionY}
        onChange={onSliderChange}
      />
    </React.Fragment>
  );
};

export default DropzoneInnerPositionY;
