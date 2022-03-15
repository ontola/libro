import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles';
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

  const [dataType, setDataType] = React.useState<'hextuples' | 'source'>('hextuples');
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
          onChange={(e) => setDataType(e.target.value as 'hextuples' | 'source')}
        >
          <MenuItem value="hextuples">
            hextuples
          </MenuItem>
          <MenuItem value="source">
            source (Typescript)
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
