import rdf, { Literal } from '@ontologies/core';
import React from 'react';
import Dropzone from 'react-dropzone';

import DropzoneInner from '../../../components/Dropzone/DropzoneInner';
import argu from '../../../ontology/argu';

import { MediaObjectOmniformDropzoneProps } from './MediaObjectOmniformDropzoneLoader';

export function getBase64(file: File): Promise<Literal> {
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

const MediaObjectOmniformDropzone: React.FC<MediaObjectOmniformDropzoneProps> = ({
  encodingFormatTypes,
  inputRef,
  onChange,
  openDialog,
  value,
}) => {
  const onDrop = async (acceptedFiles: File[]) => {
    const [file] = acceptedFiles;

    const enc = await getBase64(file);
    onChange(enc);
  };

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
            {(preview: React.ReactNode) => (
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
