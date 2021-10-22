import React from 'react';
import ReactDropzone from 'react-dropzone';

import DropzoneInner from '../../components/Dropzone/DropzoneInner';
import { DropzoneProps } from '../../containers/Dropzone';

const Dropzone: React.FC<DropzoneProps> = ({
  encodingFormat,
  fileName,
  encodingFormatTypes,
  inputRef,
  onChange,
  openDialog,
  preview,
}) => {
  const onDrop = React.useCallback((acceptedFiles) => {
    const [file] = acceptedFiles;

    onChange(
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
  }, []);

  return (
    <ReactDropzone
      accept={encodingFormatTypes}
      multiple={false}
      onDrop={onDrop}
    >
      {({
        getInputProps,
        getRootProps,
        isDragActive,
      }) => (
        <div className="Dropzone__button-spacer">
          <DropzoneInner
            encodingFormat={encodingFormat}
            fileName={fileName}
            isDragActive={isDragActive}
            preview={preview}
          >
            {(renderedPreview: React.ReactNode) => (
              <button
                type="button"
                {...getRootProps({
                  className: `Dropzone ${isDragActive ? 'Dropzone__active' : ''}`,
                  onClick: openDialog,
                })}
              >
                {renderedPreview}
                <input
                  {...getInputProps()}
                  className="Dropzone__input"
                  ref={inputRef}
                  type="file"
                />
              </button>
            )}
          </DropzoneInner>
        </div>
      )}
    </ReactDropzone>
  );
};

export default Dropzone;
