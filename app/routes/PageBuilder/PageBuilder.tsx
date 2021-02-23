import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import SplitPane from 'react-split-pane';

import ErrorBoundary from '../../components/ErrorBoundary';
import { storageKey } from '../../config';

import { PageBuilderContext } from './builderContext';
import Editor from './Editor';
import PageViewer from './PageViewer';
import Toolbar from './Toolbar';

const useStyles = makeStyles({
  container: {
    height: 'calc(100vh - 3.2rem)',
    overflow: 'hidden',
  },
  editor: {
    overflow: 'scroll',
  },
  resizer: {
    background: '#000',
    backgroundClip: 'padding-box',
    boxSizing: 'border-box',
    opacity: 0.2,
    width: '.75em',
    zIndex: 1,
  },
  viewer: {
    height: 'calc(100vh - 3.2rem - 4rem)',
    overflow: 'scroll',
  },
});

const PageBuilder = (): JSX.Element => {
  const classes = useStyles();

  return (
    <PageBuilderContext>
      <Toolbar />
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
    </PageBuilderContext>
  );
};

export default PageBuilder;
