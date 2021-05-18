import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import SplitPane from 'react-split-pane';

import ErrorBoundary from '../../components/ErrorBoundary';
import { storageKey } from '../../config';

import { PageBuilderContext, builderContext } from './builderContext';
import Editor from './Editor';
import PageViewer from './PageViewer';
import Toolbar from './Toolbar';

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

const PageBuilder = (): JSX.Element => {
  const classes = useStyles();
  const { showEditor } = React.useContext(builderContext);

  return (
    <div className={classes.windowOverlay}>
      <Toolbar />
      {showEditor
        ? (
          <Grid
            container
            className={classes.container}
            direction="row"
          >
            <SplitPane
              defaultSize={parseInt(localStorage.getItem(`${storageKey}.splitPos`) ?? '300', 10)}
              minSize={50}
              resizerClassName={classes.resizer}
              split="vertical"
              onChange={(size: number) => localStorage.setItem(`${storageKey}.splitPos`, size.toString())}
            >
              <Paper className={classes.editor}>
                <ErrorBoundary>
                  <Editor />
                </ErrorBoundary>
              </Paper>
              <Grid
                container
                className={classes.viewer}
                direction="column"
              >
                <PageViewer />
              </Grid>
            </SplitPane>
          </Grid>
        ) : (
          <Grid
            container
            className={classes.viewer}
            direction="column"
          >
            <PageViewer />
          </Grid>
        )}
    </div>
  );
};

export const PageBuilderWithContext = (): JSX.Element => (
  <PageBuilderContext>
    <PageBuilder />
  </PageBuilderContext>
);

export default PageBuilderWithContext;
