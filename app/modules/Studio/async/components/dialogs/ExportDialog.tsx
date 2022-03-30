import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useLRS } from 'link-redux';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';

import { actionMessages, studioExportMessages } from '../../../../../translations/messages';
import { ProjectAction, ProjectContextProps } from '../../context/ProjectContext';
import { useHasUnsavedChanges } from '../../hooks/useHasUnsavedChanges';
import { LibroTheme } from '../../../../../themes/themes';

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

  const hasUnsavedChanges = useHasUnsavedChanges(project);

  const data = React.useMemo(() => {
    const source = project.website.children
      .map((child) => child.value)
      .join(',\n');

    return `[${source}]`;
  }, [project.website]);

  const handleClose = React.useCallback(() => {
    dispatch({
      dialogType: undefined,
      type: ProjectAction.ShowDialog,
    });
  }, [dispatch]);

  const copyText = React.useCallback(() => {
    navigator.clipboard.writeText(data).then(() => {
      lrs.actions.ontola.showSnackbar(intl.formatMessage(actionMessages.copyFinished));
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
