import { linkType } from 'link-redux';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useField } from 'react-final-form';

import DropzoneInner from '../../../components/Dropzone/DropzoneInner';

const MediaObjectOmniformDropzone = ({
  current,
  encodingFormatTypes,
  form,
  inputRef,
  name,
  openDialog,
  propertyIndex,
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

    return onContentUrlChange([acceptedFile]);
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
          <DropzoneInner
            current={current}
            file={file}
            form={form}
            getInputProps={getInputProps}
            inputRef={inputRef}
            isDragActive={isDragActive}
            propertyIndex={propertyIndex}
            resourceInput={resourceInput}
          >
            {(preview) => (
              <button
                type="button"
                {...getRootProps({
                  className: `MediaObjectOmniformFields ${isDragActive ? 'MediaObjectOmniformFields__active' : ''}`,
                  onClick: openDialog,
                  type: 'button',
                })}
              >
                {preview}
                <input
                  {...resourceInput}
                  {...getInputProps()}
                  className="MediaObjectOmniformFields__input"
                  ref={inputRef}
                  type="file"
                />
              </button>
            )}
          </DropzoneInner>
        </div>
      )}
    </Dropzone>
  );
};

MediaObjectOmniformDropzone.propTypes = {
  current: linkType,
  encodingFormatTypes: PropTypes.string,
  form: linkType,
  inputRef: PropTypes.shape({}),
  name: PropTypes.string,
  openDialog: PropTypes.func,
  propertyIndex: PropTypes.number,
  removeItem: PropTypes.func,
  resourceInput: PropTypes.shape({}),
};

export default MediaObjectOmniformDropzone;
