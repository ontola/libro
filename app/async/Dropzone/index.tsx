import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import ReactDropzone from 'react-dropzone';

import DropzoneInner from '../../components/Dropzone/DropzoneInner';
import { DropzoneProps } from '../../containers/Dropzone';
import { LibroTheme, Margin } from '../../themes/themes';

const useStyles = makeStyles((theme: LibroTheme) => ({
  active: {
    borderStyle: 'solid',
  },
  buttonSpacer: {
    '& img': {
      maxWidth: '100%',
      minWidth: '100px',
    },
    boxSizing: 'border-box',
    display: 'block',
    marginBottom: '1rem',
    position: 'relative',
    width: '100%',
  },
  dropzone: {
    '&:hover': {
      borderStyle: 'dotted',
    },
    border: `2px dashed ${theme.palette.grey.main}`,
    color: theme.palette.grey.main,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(Margin.Medium),
    width: '100%',
  },
  input: {
    display: 'none',
  },
}));

const Dropzone: React.FC<DropzoneProps> = ({
  encodingFormat,
  fileName,
  encodingFormatTypes,
  inputRef,
  onChange,
  openDialog,
  preview,
}) => {
  const classes = useStyles();
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
        <div className={classes.buttonSpacer}>
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
                  className: (clsx({
                    [classes.dropzone]: true,
                    [classes.active]: isDragActive,
                  })),
                  onClick: openDialog,
                })}
              >
                {renderedPreview}
                <input
                  {...getInputProps()}
                  className={classes.input}
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
