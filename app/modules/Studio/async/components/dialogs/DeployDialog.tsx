import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useLRS } from 'link-redux';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { formMessages, studioDistributionMessages } from '../../../../../translations/messages';
import { ShowSnackbar } from '../../../../Common/middleware/actions';
import { ProjectAction, ProjectContextProps } from '../../context/ProjectContext';
import { deployDistribution } from '../../lib/distributionAgent';

export const DeployDialog: React.FC<ProjectContextProps> = ({ dispatch, project }) => {
  const lrs = useLRS();
  const intl = useIntl();

  const [route, setRoute] = React.useState(project.websiteIRI);
  const [valid, setValid] = React.useState(true);

  const handleClose = React.useCallback(() => {
    dispatch({
      dialogType: undefined,
      type: ProjectAction.ShowDialog,
    });
  }, []);

  const handleDeploy = React.useCallback(() => {
    deployDistribution(project.distributionToDeploy!.iri, new URL(route)).then(() => {
      handleClose();

      lrs.settings.get(ShowSnackbar)(intl.formatMessage(studioDistributionMessages.deploySuccess, {
        route,
        version: project.distributionToDeploy!.version,
      }));
    });
  }, [route]);

  React.useEffect(() => {
    try {
      new URL(route);
      setValid(true);
    } catch {
      setValid(false);
    }
  }, [route]);

  return (
    <Dialog
      open
      onClose={handleClose}
    >
      <DialogTitle>
        <FormattedMessage {...studioDistributionMessages.deployDialogTitle} />
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {intl.formatMessage(studioDistributionMessages.deployDialogBody, {
            version: project.distributionToDeploy!.version,
          })}
        </Typography>
        <TextField
          autoFocus
          fullWidth
          required
          error={!valid}
          id="new-distribution-version"
          label={intl.formatMessage(studioDistributionMessages.tableHeadingRoute)}
          margin="dense"
          value={route}
          variant="outlined"
          onChange={(e) => setRoute(e.target.value)}
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
          disabled={!valid}
          variant="contained"
          onClick={handleDeploy}
        >
          <FormattedMessage {...studioDistributionMessages.actionDeploy} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
