import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

import ErrorBoundary from '../../../../../components/ErrorBoundary';
import { DialogType, ProjectContextProps } from '../../context/ProjectContext';
import { usePopoutViewer } from '../../hooks/usePopoutViewer';
import { Content } from '../Content';
import { CreateDistributionDialog } from '../dialogs/CreateDistributionDialog';
import { DeployDialog } from '../dialogs/DeployDialog';
import { ExportDialog } from '../dialogs/ExportDialog';
import { ImportDialog } from '../dialogs/ImportDialog';
import { LeftPanel } from '../LeftPanel';
import Toolbar from '../Toolbar';

const useStyles = makeStyles({
  container: {
    flexFlow: 'initial',
    height: 'calc(100vh - 3.2rem)',
  },
  editor: {
    height: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  resizer: {
    '&:hover': {
      opacity: 1,
    },
    background: '#000',
    backgroundClip: 'padding-box',
    boxSizing: 'border-box',
    cursor: 'ew-resize',
    flexShrink: 0,
    opacity: '.5',
    width: '.4rem',
    zIndex: 1,
  },
  viewer: {
    height: 'calc(100vh - 3.2rem)',
    overflow: 'scroll',
  },
});

export const ProjectScreen = ({ dispatch, project }: ProjectContextProps): JSX.Element => {
  const classes = useStyles();

  const [open, setOpened] = React.useState(false);
  const recreateDialog = usePopoutViewer({
    onClose: () => setOpened(false),
    onOpen: () => setOpened(true),
    project,
  });

  return (
    <React.Fragment>
      <Toolbar
        connected={open}
        dispatch={dispatch}
        project={project}
        recreateDialog={recreateDialog}
      />
      <Grid
        container
        className={classes.container}
        direction="row"
      >
        <Grid
          item
          className={classes.container}
        >
          <Paper className={classes.editor}>
            <LeftPanel
              dispatch={dispatch}
              project={project}
            />
          </Paper>
        </Grid>
        <Grid
          item
          className={classes.grow}
        >
          <Paper className={classes.editor}>
            <ErrorBoundary>
              <Content
                dispatch={dispatch}
                project={project}
              />
            </ErrorBoundary>
          </Paper>
        </Grid>
      </Grid>
      {project.dialog === DialogType.Import && (
        <ImportDialog
          dispatch={dispatch}
          project={project}
        />
      )}
      {project.dialog === DialogType.CreateDistribution && (
        <CreateDistributionDialog
          dispatch={dispatch}
          project={project}
        />
      )}
      {project.dialog === DialogType.Deploy && (
        <DeployDialog
          dispatch={dispatch}
          project={project}
        />
      )}
      {project.dialog === DialogType.Export && (
        <ExportDialog
          dispatch={dispatch}
          project={project}
        />
      )}
    </React.Fragment>
  );
};
