import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useLRS } from 'link-redux';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { formMessages, studioDistributionMessages } from '../../../../../translations/messages';
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

      lrs.actions.ontola.showSnackbar(intl.formatMessage(studioDistributionMessages.deploySuccess, {
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