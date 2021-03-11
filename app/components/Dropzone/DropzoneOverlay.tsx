import clsx from 'clsx';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

interface Props {
  isDragActive: boolean;
  overlay?: boolean;
}

const DropzoneOverlay: React.FC<Props> = ({ isDragActive, overlay }) => {
  const classes = clsx({
    MediaObjectOmniformFields__messages: true,
    MediaObjectOmniformFields__overlay: overlay,
  });

  return (
    <div className={classes}>
      <FontAwesome
        className="MediaObjectOmniformFields__icon"
        name="cloud-upload"
      />
      {isDragActive
        ? (
          <FormattedMessage
            defaultMessage="Release to select this file"
            id="https://app.argu.co/i18n/forms/dropzone/hoverText"
          />
        )
        : (
          <FormattedMessage
            defaultMessage="Drag & Drop your file here or click to select a file"
            id="https://app.argu.co/i18n/forms/dropzone/passiveText"
          />
        )}
    </div>
  );
};

export default DropzoneOverlay;
