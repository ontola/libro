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

const useStyles = makeStyles({
  container: {
    height: 'calc(100vh - 3.2rem)',
    overflow: 'hidden',
  },
  editor: {
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
    opacity: '.5',
    width: '1rem',
    zIndex: 1,
  },
  viewer: {
    height: 'calc(100vh - 3.2rem - 4rem)',
    overflow: 'scroll',
  },
});

const PageBuilder = (): JSX.Element => {
  const classes = useStyles();
  const { showEditor } = React.useContext(builderContext);

  return (
    <React.Fragment>
      <Toolbar />
      {showEditor ?
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
        </Grid> :
        <PageViewer />}
    </React.Fragment>
  );
};

export const PageBuilderWithContext = (): JSX.Element => (
  <PageBuilderContext>
    <PageBuilder />
  </PageBuilderContext>
);

export default PageBuilderWithContext;
