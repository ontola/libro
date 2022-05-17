import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

import DropzoneLoader from '../../../../containers/Dropzone';

const KEY_ENTER = 13;

export interface InputDialogProps {
  buttonCancel?: string;
  buttonOK?: string;
  callback: (input: string) => void;
  id: string;
  initialValue?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  text: string;
  title: string;
  type: string;
}

export const InputDialog = ({
  buttonCancel,
  buttonOK,
  callback,
  id,
  initialValue = '',
  open,
  setOpen,
  text,
  title,
  type,
}: InputDialogProps): JSX.Element => {
  const [value, setValue] = useState(initialValue);

  const inputRef = React.createRef<HTMLInputElement>();

  const handleOnChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleDropChange = (acceptedFile: File) => {
    // acceptedFile.;
    // setValue(event.value);
  };

  const openDialog = () => {
    const { current } = inputRef;

    if (!current) {
      throw new Error('No input ref on dropzone');
    }

    current.click();
  };

  const handleOK = () => {
    setOpen(false);
    callback(value);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const renderDropzone = () => (
    <DropzoneLoader
      encodingFormatTypes="image/*"
      inputRef={inputRef}
      name="RTE-image"
      openDialog={openDialog}
      value={value}
      onChange={handleDropChange}
    />
  );

  const renderTextField = () => (
    <TextField
      autoFocus
      fullWidth
      data-testid={`${id}_text`}
      id={`${id}_input`}
      margin="dense"
      type={type}
      value={value}
      onChange={handleOnChange}
      onKeyUp={(e) => {
        if (e.keyCode === KEY_ENTER) {
          handleOK();
        }
      }}
    />
  );

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      data-testid={id}
      open={open}
      onClose={handleCancel}
    >
      <DialogTitle id="form-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>
        {type === 'file' ? renderDropzone() : renderTextField()}
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          data-testid={`${id}_cancel`}
          onClick={handleCancel}
        >
          {buttonCancel || 'Cancel'}
        </Button>
        <Button
          color="primary"
          data-testid={`${id}_ok`}
          onClick={handleOK}
        >
          {buttonOK || 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
