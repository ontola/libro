import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import MonacoEditor from '@monaco-editor/react';
import React from 'react';

import { builderContext } from './builderContext';
import { useMonacoWithBundle } from './useMonacoWithBundle';

const EDITOR_SKELETON_HEIGHT = 25;

const useStyles = makeStyles({
  root: {
    height: '100vh',
    transform: 'scale(0.8, 1)',
  },
});

const Editor: React.FC = () => {
  const classes = useStyles();
  const { source, setSource } = React.useContext(builderContext);
  const initialized = useMonacoWithBundle();

  if (!initialized) {
    return (
      <Grid
        container
        direction="row"
        style={{ height: '90vh' }}
      >
        <Grid item xs={1}>
          <Skeleton
            animation="wave"
            classes={classes}
          />
        </Grid>
        <Grid item xs={10}>
          {Array(EDITOR_SKELETON_HEIGHT).fill(undefined).map((_, i) => (
            <Skeleton animation="wave" key={i} />
          ))}
        </Grid>
      </Grid>
    );
  }

  return (
    <MonacoEditor
      defaultLanguage="typescript"
      height="90vh"
      language="typescript"
      line={0}
      options={{
        formatOnPaste: true,
        formatOnType: true,
        lineNumbersMinChars: 1,
        minimap: {
          enabled: false,
        },
        wordWrap: 'on',
      }}
      path="/"
      theme="vs-dark"
      value={source}
      onChange={(v) => setSource(v || '')}
    />
  );
};

export default Editor;
