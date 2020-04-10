import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import {
  Resource,
  linkType,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import { tryParseInt } from '../../helpers/numbers';
import CoverImage from '../CoverImage';
import CoverImageSlider from '../CoverImageSlider';
import ontola from '../../ontology/ontola';

const DropzoneInnerPositionY = ({
  children,
  current,
  file,
  imagePositionYShape,
  propertyIndex,
}) => {
  const [currentContent] = useResourceProperty(current, schema.contentUrl);
  const [targetValue] = useResourceProperty(current, ontola.imagePositionY);
  const [positionY, setPositionY] = useState(tryParseInt(targetValue));
  const onSliderChange = (event, value) => setPositionY(100 - value);

  return (
    <React.Fragment>
      {children(
        <div style={{ flexGrow: 1 }}>
          <CoverImage
            positionY={positionY}
            url={file?.url || currentContent?.value}
          />
        </div>
      )}
      <CoverImageSlider
        imagePositionYShape={imagePositionYShape}
        propertyIndex={propertyIndex}
        targetValue={targetValue}
        value={positionY}
        onChange={onSliderChange}
      />
    </React.Fragment>
  );
};

DropzoneInnerPositionY.propTypes = {
  children: PropTypes.func,
  current: linkType,
  file: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  imagePositionYShape: linkType,
  propertyIndex: PropTypes.number,
};

const DropzoneInner = ({
  children,
  current,
  file,
  form,
  isDragActive,
  propertyIndex,
}) => {
  const lrs = useLRS();

  if (current || file) {
    const imagePositionYShape = lrs.findSubject(
      form,
      [sh.property, sh.path],
      ontola.imagePositionY
    ).pop();

    if (imagePositionYShape) {
      return (
        <DropzoneInnerPositionY
          current={current}
          file={file}
          form={form}
          imagePositionYShape={imagePositionYShape}
          propertyIndex={propertyIndex}
        >
          {children}
        </DropzoneInnerPositionY>
      );
    }
  }

  if (file) {
    return children(
      <div>
        <img alt={file.name} src={file.url} />
        <div>{file.name}</div>
      </div>
    );
  }
  if (current) {
    return children(<Resource subject={current} />);
  }

  return children(
    <div className="MediaObjectOmniformFields__messages">
      <FontAwesome
        className="MediaObjectOmniformFields__icon"
        name="cloud-upload"
      />
      {
        isDragActive
          ? (
            <FormattedMessage
              defaultMessage="Release to select this file"
              id="https://app.argu.co/i18n/forms/dropzone/hoverText"
            />
          ) : (
            <FormattedMessage
              defaultMessage="Drag & Drop your file here or click to select a file"
              id="https://app.argu.co/i18n/forms/dropzone/passiveText"
            />
          )
      }
    </div>
  );
};

DropzoneInner.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  current: linkType,
  file: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  form: linkType,
  imagePositionYShape: linkType,
  isDragActive: PropTypes.bool,
  propertyIndex: PropTypes.number,
};

export default DropzoneInner;
