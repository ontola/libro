import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import MonacoEditor from '@monaco-editor/react';
import React from 'react';

import { builderContext, editorStateContext } from './builderContext';
import { useMonacoWithBundle } from './useMonacoWithBundle';

const EDITOR_SKELETON_HEIGHT = 25;

const useStyles = makeStyles({
  root: {
    height: '100vh',
    transform: 'scale(0.8, 1)',
    width: '100vw',
  },
});

const Editor: React.FC = () => {
  const classes = useStyles();
  const { file } = React.useContext(editorStateContext);
  const { files, updateFile } = React.useContext(builderContext);
  const initialized = useMonacoWithBundle();

  const t = files.find((f) => f.name === file);

  if (!initialized) {
    return (
      <Grid
        container
        direction="row"
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

  if (!t) {
    return (
      <div>File not found</div>
    );
  }

  return (
    <MonacoEditor
      defaultLanguage="typescript"
      height="inherit"
      language={t.language}
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
      path={t.name}
      theme="vs-dark"
      value={t.value}
      width="100vw"
      onChange={(v) => updateFile({
        ...t,
        value:  v ?? '',
      })}
    />
  );
};

export default Editor;
