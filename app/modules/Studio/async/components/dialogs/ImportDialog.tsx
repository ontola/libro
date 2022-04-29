import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useIntl } from 'react-intl';

import { studioToolbarMessages } from '../../../../../translations/messages';
import { ProjectAction, ProjectContextProps } from '../../context/ProjectContext';

const useStyles = makeStyles({
  inherit: {
    color: 'inherit',
  },
  textField: {
    maxHeight: '30em',
  },
});

export const ImportDialog = ({ dispatch }: ProjectContextProps): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  const [dataType, setDataType] = React.useState<'dataslice' | 'source'>('source');
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
      dataType,
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
        <Select
          autoWidth
          multiple={false}
          native={false}
          value={dataType}
          onChange={(e) => setDataType(e.target.value as 'dataslice' | 'source')}
        >
          <MenuItem value="source">
            source (Typescript)
          </MenuItem>
          <MenuItem value="dataslice">
            data slice
          </MenuItem>
        </Select>
        <TextField
          autoFocus
          fullWidth
          multiline
          className={classes.textField}
          id="data"
          label={dataType}
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
