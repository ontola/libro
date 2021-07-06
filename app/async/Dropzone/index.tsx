import { useLRS } from 'link-redux';
import React from 'react';
import ReactDropzone from 'react-dropzone';
import { useIntl } from 'react-intl';

import DropzoneInner from '../../components/Dropzone/DropzoneInner';
import { DropzoneProps } from '../../containers/Dropzone';
import { getMetaContent } from '../../helpers/arguHelpers';
import { formMessages } from '../../translations/messages';
import { Severity } from '../../views/Snackbar';

const BYTES_IN_A_MEGABYTE = 1_000_000;

const maxUploadFileSizeStr = getMetaContent('maxUploadFileSize');
const uploadSizeLimitBytes = maxUploadFileSizeStr
  ? Number.parseInt(maxUploadFileSizeStr, 10) * BYTES_IN_A_MEGABYTE
  : Infinity;

const Dropzone: React.FC<DropzoneProps> = ({
  encodingFormat,
  fileName,
  encodingFormatTypes,
  inputRef,
  onChange,
  openDialog,
  preview,
}) => {
  const lrs = useLRS();
  const intl = useIntl();

  const handleFileReject = (files: File[], totalFiles: number) => {
    if (totalFiles > 1) {
      lrs.actions.ontola.showSnackbar(intl.formatMessage(formMessages.multipleFileError), Severity.Error);

      return;
    }

    if (files.some((file) => file.size > uploadSizeLimitBytes)) {
      lrs.actions.ontola.showSnackbar(
        intl.formatMessage(formMessages.maxFileSizeMessage, { fileSizeLimit: maxUploadFileSizeStr }),
        Severity.Error,
      );

      return;
    }

    if (files.some((file) => !encodingFormatTypes.includes(file.type))) {
      lrs.actions.ontola.showSnackbar(intl.formatMessage(formMessages.invalidFileFormat), Severity.Error);
    }
  };

  const handleFileAccept = (files: File[]) => {
    const [file] = files;

    onChange(
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
  };

  const onDrop = React.useCallback((acceptedFiles: File[], rejectedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      handleFileAccept(acceptedFiles);
    }

    if (rejectedFiles.length > 0) {
      handleFileReject(rejectedFiles, acceptedFiles.length + rejectedFiles.length);
    }
  }, []);


  return (
    <ReactDropzone
      accept={encodingFormatTypes}
      maxSize={uploadSizeLimitBytes}
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
                  type: 'button',
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
