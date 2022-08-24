import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLRS } from 'link-redux';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { ShowSnackbar } from '../../../../Common/middleware/actions';
import { LibroTheme } from '../../../../Kernel/lib/themes';
import { actionMessages, studioExportMessages } from '../../../../../translations/messages';
import { ProjectAction, ProjectContextProps } from '../../context/ProjectContext';
import { useHasUnsavedChanges } from '../../hooks/useHasUnsavedChanges';

const INDENT = 2;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  button: {
    color: theme.palette.text.primary,
  },
  contentWrapper: {
    position: 'relative',
  },
  copyButtonWrapper: {
    bottom: '1rem',
    position: 'absolute',
    right: '1rem',
  },
}));

const selectTextContent = (node: HTMLElement | null) => {
  if (node) {
    node.focus();
    const selection = document.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);

    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
};

export const ExportDialog: React.FC<ProjectContextProps> = ({ dispatch, project }) => {
  const lrs = useLRS();
  const intl = useIntl();
  const classes = useStyles();

  const [exportType, setExportType] = React.useState<'dataslice' | 'site'>('site');
  const hasUnsavedChanges = useHasUnsavedChanges(project);

  const data = React.useMemo(
    () => {
      switch (exportType) {
      case 'site': return JSON.stringify({
        manifest: project.manifest,
        // eslint-disable-next-line sort-keys
        data: project.data,
      }, null,  INDENT);
      case 'dataslice': return JSON.stringify(project.data, null, INDENT);
      }
    },
    [project.website, exportType],
  );

  const handleClose = React.useCallback(() => {
    dispatch({
      dialogType: undefined,
      type: ProjectAction.ShowDialog,
    });
  }, [dispatch]);

  const copyText = React.useCallback(() => {
    navigator.clipboard.writeText(data).then(() => {
      lrs.actions.get(ShowSnackbar)(intl.formatMessage(actionMessages.copyFinished));
    });
  }, [data]);

  const ref = React.useCallback(selectTextContent, [data]);

  return (
    <Dialog
      open
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      onClose={handleClose}
    >
      <DialogTitle id="form-dialog-title">
        <FormattedMessage {...studioExportMessages.dialogTitle} />
      </DialogTitle>
      <DialogContent>
        <Select
          autoWidth
          multiple={false}
          native={false}
          value={exportType}
          onChange={(e) => setExportType(e.target.value as 'dataslice' | 'site')}
        >
          <MenuItem value="site">
            Site
          </MenuItem>
          <MenuItem value="dataslice">
            Data slice
          </MenuItem>
        </Select>
        {hasUnsavedChanges ? (
          <Typography
            color="error"
            variant="body1"
          >
            <FormattedMessage {...studioExportMessages.saveChanges} />
          </Typography>
        ) : (
          <div className={classes.contentWrapper}>
            <textarea
              readOnly
              cols={60}
              ref={ref}
              rows={40}
              value={data}
            />
            <div className={classes.copyButtonWrapper}>
              <Tooltip title={intl.formatMessage(actionMessages.copyTooltip)}>
                <IconButton
                  className={classes.button}
                  onClick={copyText}
                >
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
