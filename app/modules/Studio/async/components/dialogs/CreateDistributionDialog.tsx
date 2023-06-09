import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { formMessages, studioDistributionMessages } from '../../../../../translations/messages';
import { ProjectAction, ProjectContextProps } from '../../context/ProjectContext';
import { useHasUnsavedChanges } from '../../hooks/useHasUnsavedChanges';
import { createNewDistribution } from '../../lib/distributionAgent';

const versionInputProps = {
  startAdornment: (
    <InputAdornment position="start">
      v
    </InputAdornment>
  ),
};

export const CreateDistributionDialog = ({ dispatch, project }: ProjectContextProps): JSX.Element => {
  const intl = useIntl();
  const [version, setVersion] = React.useState('');
  const [message, setMessage] = React.useState('');

  const hasUnsavedChanges = useHasUnsavedChanges(project);

  const handleClose = React.useCallback(() => {
    dispatch({
      dialogType: undefined,
      type: ProjectAction.ShowDialog,
    });
  }, []);

  const handleSave = React.useCallback(() => {
    if (!project.iri) {
      return;
    }

    createNewDistribution(project.iri, version, message).then((success) => {
      if (success) {
        handleClose();
      }
    });
  }, [project.iri, version, message]);

  return (
    <Dialog
      open
      onClose={handleClose}
    >
      <DialogTitle>
        <FormattedMessage {...studioDistributionMessages.distributionDialogTitle} />
      </DialogTitle>
      <DialogContent>
        {hasUnsavedChanges && (
          <Typography
            paragraph
            color="error"
            variant="body1"
          >
            <FormattedMessage {...studioDistributionMessages.distributionDialogWarning} />
          </Typography>
        )}
        <TextField
          autoFocus
          fullWidth
          required
          InputProps={versionInputProps}
          id="new-distribution-version"
          label={intl.formatMessage(studioDistributionMessages.tableHeadingVersion)}
          margin="dense"
          variant="outlined"
          onChange={(e) => setVersion(e.target.value)}
        />
        <TextField
          fullWidth
          multiline
          required
          id="new-distribution-message"
          label={intl.formatMessage(studioDistributionMessages.tableHeadingDescription)}
          margin="dense"
          variant="outlined"
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={handleClose}
        >
          <FormattedMessage {...formMessages.cancelLabel} />
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSave}
        >
          <FormattedMessage {...studioDistributionMessages.distributionDialogPrimaryButton} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
