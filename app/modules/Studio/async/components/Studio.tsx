import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import ErrorBoundary from '../../../../components/ErrorBoundary';
import { usePopoutViewer } from '../lib/hooks/usePopoutViewer';

import { StudioContextProvider } from './StudioContextProvider';
import { Tabbar } from './Tabbar';
import Toolbar from './Toolbar';
import Editor from './Editor';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'calc(100vh - 3.2rem)',
    overflow: 'hidden',
  },
  editor: {
    height: '100%',
    overflow: 'scroll',
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
  windowOverlay: {
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: theme.zIndex.appBar + 1,
  },
}));

const Studio = (): JSX.Element => {
  const classes = useStyles();
  const [open, setOpened] = React.useState(false);
  const recreateDialog = usePopoutViewer({
    onClose: () => setOpened(false),
    onOpen: () => setOpened(true),
  });

  return (
    <StudioContextProvider>
      <div className={classes.windowOverlay}>
        <Toolbar
          connected={open}
          recreateDialog={recreateDialog}
        />
        <Tabbar />
        <Grid
          container
          className={classes.container}
          direction="row"
        >
          <Paper className={classes.editor}>
            <ErrorBoundary>
              <Editor
                onMount={recreateDialog}
              />
            </ErrorBoundary>
          </Paper>
        </Grid>
      </div>
    </StudioContextProvider>
  );
};

export default Studio;
