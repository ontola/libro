import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

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
}: InputDialogProps) => {
  const [value, setValue] = useState(initialValue);

  const handleOnChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleOK = () => {
    setOpen(false);
    callback(value);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      data-testid={id}
      onClose={handleCancel}
      open={open}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
        <TextField
          autoFocus
          data-testid={`${id}_text`}
          fullWidth
          id={`${id}_input`}
          margin="dense"
          onChange={handleOnChange}
          onKeyUp={(e) => {
            if (e.keyCode === KEY_ENTER) {
              handleOK();
            }
          }}
          type={type}
          value={value}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary" data-testid={`${id}_cancel`}>
          {buttonCancel || 'Cancel'}
        </Button>
        <Button onClick={handleOK} color="primary" data-testid={`${id}_ok`}>
          {buttonOK || 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
