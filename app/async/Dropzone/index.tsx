import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useLRS } from 'link-redux';
import React from 'react';
import ReactDropzone, { FileRejection } from 'react-dropzone';

import DropzoneClear from '../../components/Dropzone/DropzoneClear';
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
  clearable,
  encodingFormat,
  fileName,
  encodingFormatTypes,
  inputRef,
  maxSize,
  onChange,
  openDialog,
  preview,
}) => {
  const lrs = useLRS();
  const classes = useStyles();
  const onClear = React.useCallback((e) => {
    e.preventDefault();

    onChange(undefined);
  }, []);

  const onDrop = React.useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    const error = rejectedFiles?.[0]?.errors?.[0];

    if (error) {
      lrs.actions.ontola.showSnackbar(error.message);
    }

    const [file] = acceptedFiles;

    if (file) {
      onChange(file);
    }
  }, []);

  return (
    <ReactDropzone
      accept={encodingFormatTypes}
      maxSize={maxSize}
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
              <React.Fragment>
                {clearable && preview && <DropzoneClear onClear={onClear} />}
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
              </React.Fragment>
            )}
          </DropzoneInner>
        </div>
      )}
    </ReactDropzone>
  );
};

export default Dropzone;
