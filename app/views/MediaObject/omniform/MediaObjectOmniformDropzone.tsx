import rdf from '@ontologies/core';
import * as PropTypes from 'prop-types';
import React, { EventHandler, Ref } from 'react';
import Dropzone from 'react-dropzone';

import DropzoneInner from '../../../components/Dropzone/DropzoneInner';
import argu from '../../../ontology/argu';

export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(rdf.literal(
      reader.result,
      argu.ns(`base64File?filename=${encodeURIComponent(file.name)}`),
    ));
    reader.onerror = (error) => reject(error);
  });
}

interface PropTypes {
  encodingFormatTypes: string;
  inputRef: Ref<any>;
  name: string;
  onChange: EventHandler<any>;
  openDialog: EventHandler<any>;
  removeItem: EventHandler<any>;
  value: string;
}

const MediaObjectOmniformDropzone: React.FC<PropTypes> = ({
  encodingFormatTypes,
  inputRef,
  onChange,
  openDialog,
  value,
}) => {
  const onDrop = (acceptedFiles: File[]) => (
    new Promise(() => {
      const [file] = acceptedFiles;

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
            isDragActive={isDragActive}
          >
            {(preview: any) => (
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

export default MediaObjectOmniformDropzone;
