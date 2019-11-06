import { LinkedResourceContainer, linkType } from 'link-redux';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useField } from 'react-final-form';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import OmniformRemoveButton from '../../../components/Omniform/OmniformRemoveButton';

const dropzoneInner = (file, current, isDragActive) => {
  if (file) {
    return (
      <div>
        <img src={file.url} />
        <div>{file.name}</div>
      </div>
    );
  }
  if (current) {
    return <LinkedResourceContainer subject={current} />;
  }

  return (
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

const MediaObjectOmniformDropzone = ({
  current,
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
    },
  } = useField(name);
  const [file, setFile] = useState();
  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    if (file) {
      URL.revokeObjectURL(file.url);
    }
  }, [file]);

  const onChange = (acceptedFiles) => {
    const acceptedFile = acceptedFiles[0];
    setFile(acceptedFile && Object.assign(acceptedFile, {
      url: URL.createObjectURL(acceptedFile),
    }));

    return onContentUrlChange(acceptedFile);
  };

  const onRemove = (e) => {
    setFile(null);
    removeItem(e);
  };

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
          {(current || file) && removeItem && <OmniformRemoveButton removeItem={onRemove} />}
          <button
            {...getRootProps({
              className: `MediaObjectOmniformFields ${isDragActive ? 'MediaObjectOmniformFields__active' : ''}`,
              onClick: openDialog,
              type: 'button',
            })}
          >
            {dropzoneInner(file, current, isDragActive)}
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
  current: linkType,
  encodingFormatTypes: PropTypes.string,
  inputRef: PropTypes.shape({}),
  name: PropTypes.string,
  openDialog: PropTypes.func,
  removeItem: PropTypes.func,
  resourceInput: PropTypes.shape({}),
};

export default MediaObjectOmniformDropzone;
