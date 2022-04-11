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
import {
  ImportType,
  ProjectAction,
  ProjectContextProps,
} from '../../context/ProjectContext';

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

  const [dataType, setDataType] = React.useState<ImportType>(ImportType.Website);
  const [data, setData] = React.useState('');

  const handleClose = React.useCallback(() => {
    dispatch({
      dialogType: undefined,
      type: ProjectAction.ShowDialog,
    });
  }, []);

  const handleImport = React.useCallback(() => {
    if (dataType === ImportType.Website) {
      fetch(data, {
        credentials: 'omit',
        mode: 'cors',
      })
        .then((response) => response.text())
        .then((body) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(body, 'text/html');
          const seed = doc.getElementById('seed')?.innerText ?? '';

          dispatch({
            data: seed,
            dataType: ImportType.Website,
            type: ProjectAction.ImportData,
          });
        });
    } else {
      dispatch({
        data,
        dataType,
        type: ProjectAction.ImportData,
      });
    }

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
          onChange={(e) => setDataType(e.target.value as ImportType)}
        >
          <MenuItem value={ImportType.Website}>
            Website (imports seed)
          </MenuItem>
          <MenuItem value={ImportType.Hextuples}>
            Hextuples
          </MenuItem>
          <MenuItem value={ImportType.Source}>
            Source (Typescript)
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
