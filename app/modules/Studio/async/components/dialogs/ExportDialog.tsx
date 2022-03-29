import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { studioExportMessages } from '../../../../../translations/messages';
import { ProjectAction, ProjectContextProps } from '../../context/ProjectContext';
import { useHasUnsavedChanges } from '../../hooks/useHasUnsavedChanges';

export const ExportDialog: React.FC<ProjectContextProps> = ({ dispatch, project }) => {
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

  const ref = React.useCallback((node: HTMLTextAreaElement | null) => {
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
  }, [data]);

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
          <textarea
            readOnly
            cols={60}
            ref={ref}
            rows={40}
            value={data}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
