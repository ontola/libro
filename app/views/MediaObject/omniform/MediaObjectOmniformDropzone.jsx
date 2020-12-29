import rdf from '@ontologies/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import Dropzone from 'react-dropzone';

import DropzoneInner from '../../../components/Dropzone/DropzoneInner';
import argu from '../../../ontology/argu';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(rdf.literal(
      reader.result,
      argu.ns(`base64File?filename=${encodeURIComponent(file.name)}`)
    ));
    reader.onerror = (error) => reject(error);
  });
}

const MediaObjectOmniformDropzone = ({
  encodingFormatTypes,
  inputRef,
  onChange,
  openDialog,
  resourceInput,
  value,
}) => {
  const onDrop = (acceptedFiles) => (
    new Promise(() => {
      let file = acceptedFiles;

      if (Array.isArray(acceptedFiles)) {
        [file] = acceptedFiles;
      }

      return getBase64(file)
        .then((enc) => {
          onChange(enc);
        });
    })
  );

  return (
    <Dropzone
      accept={encodingFormatTypes}
      multiple={false}
      onDrop={onDrop}
    >
      {({
        getInputProps,
        getRootProps,
        isDragActive,
      }) => (
        <div className="MediaObjectOmniformFields__button-spacer">
          <DropzoneInner
            file={value}
            getInputProps={getInputProps}
            inputRef={inputRef}
            isDragActive={isDragActive}
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
  encodingFormatTypes: PropTypes.string,
  inputRef: PropTypes.shape({}),
  name: PropTypes.string,
  onChange: PropTypes.func,
  openDialog: PropTypes.func,
  removeItem: PropTypes.func,
  resourceInput: PropTypes.shape({}),
  value: PropTypes.string,
};

export default MediaObjectOmniformDropzone;
