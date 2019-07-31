import * as PropTypes from 'prop-types';
import React from 'react';
import Dropzone from 'react-dropzone';
import { useField } from 'react-final-form';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import OmniformRemoveButton from '../../../components/Omniform/OmniformRemoveButton';

const MediaObjectOmniformDropzone = ({
  encodingFormatTypes,
  inputRef,
  name,
  openDialog,
  removeItem,
  resourceInput,
}) => {
  const {
    input: {
      onChange: onContentUrlChange,
      value: contentUrl,
    },
  } = useField(name);

  const onChange = e => onContentUrlChange(e[0]);

  return (
    <Dropzone
      accept={encodingFormatTypes}
      multiple={false}
      onDrop={onChange}
    >
      {({
        getInputProps,
        getRootProps,
        isDragActive,
      }) => (
        <div className="MediaObjectOmniformFields__button-spacer">
          <OmniformRemoveButton removeItem={removeItem} />
          <button
            {...getRootProps({
              className: `MediaObjectOmniformFields ${isDragActive ? 'MediaObjectOmniformFields__active' : ''}`,
              onClick: openDialog,
              type: 'button',
            })}
          >
            <div className="MediaObjectOmniformFields__messages">
              <FontAwesome className="MediaObjectOmniformFields__icon" name="cloud-upload" />
              {isDragActive
                ? (
                  <FormattedMessage
                    id="https://app.argu.co/i18n/forms/dropzone/hoverText"
                    message="Release to select this file"
                  />
                )
                : (
                  <FormattedMessage
                    id="https://app.argu.co/i18n/forms/dropzone/passiveText"
                    message="Drag & Drop your file here or click to select a file"
                  />
                )

              }
              <div>{contentUrl?.name}</div>
            </div>
            <input
              {...resourceInput}
              {...getInputProps()}
              className="MediaObjectOmniformFields__input"
              ref={inputRef}
              type="file"
            />
          </button>
        </div>
      )}
    </Dropzone>
  );
};

MediaObjectOmniformDropzone.propTypes = {
  encodingFormatTypes: PropTypes.string,
  inputRef: PropTypes.shape({}),
  name: PropTypes.string,
  openDialog: PropTypes.func,
  removeItem: PropTypes.func,
  resourceInput: PropTypes.shape({}),
};

export default MediaObjectOmniformDropzone;
