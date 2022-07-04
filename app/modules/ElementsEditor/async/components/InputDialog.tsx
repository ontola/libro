import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

import DropzoneLoader from '../../../Form/components/Dropzone';

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

  const handleDropChange = (_: File | undefined) => {
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
      name="elements-editor-image"
      openDialog={openDialog}
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
          {buttonCancel ?? 'Cancel'}
        </Button>
        <Button
          color="primary"
          data-testid={`${id}_ok`}
          onClick={handleOK}
        >
          {buttonOK ?? 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
