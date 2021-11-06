import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useIntl } from 'react-intl';

import { studioToolbarMessages } from '../../../../../translations/messages';
import { ProjectAction, ProjectContextProps } from '../../context/ProjectContext';

const useStyles = makeStyles({
  inherit: {
    color: 'inherit',
  },
});

export const ImportDialog = ({ dispatch }: ProjectContextProps): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  const [data, setData] = React.useState('');

  const handleClose = React.useCallback(() => {
    dispatch({
      dialogType: undefined,
      type: ProjectAction.ShowDialog,
    });
  }, []);

  const handleImport = React.useCallback(() => {
    dispatch({
      data,
      type: ProjectAction.ImportData,
    });
    dispatch({
      dialogType: undefined,
      type: ProjectAction.ShowDialog,
    });
  }, [data]);

  return (
    <Dialog
      open
      aria-labelledby="form-dialog-title"
      onClose={handleClose}
    >
      <DialogTitle id="form-dialog-title">
        {intl.formatMessage(studioToolbarMessages.importDialogTitle)}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {intl.formatMessage(studioToolbarMessages.importDialogText)}
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          multiline
          id="data"
          label="hextuples"
          margin="dense"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Box
          bgcolor="error.main"
          color="error.contrastText"
        >
          <Button
            className={classes.inherit}
            onClick={handleImport}
          >
            {intl.formatMessage(studioToolbarMessages.importDialogConfirm)}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
