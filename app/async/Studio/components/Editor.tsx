import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import MonacoEditor from '@monaco-editor/react';
import React from 'react';

import { studioContext } from '../context/StudioContext';
import { editorStateContext } from '../context/EditorStateContext';
import { useMonacoWithBundle } from '../hooks/useMonacoWithBundle';

const EDITOR_SKELETON_HEIGHT = 25;

const useStyles = makeStyles({
  root: {
    height: '100vh',
    transform: 'scale(0.8, 1)',
    width: '100vw',
  },
});

export interface EditorProps {
  onMount: () => void;
}

const Editor = ({ onMount }: EditorProps): JSX.Element => {
  const classes = useStyles();
  const { file } = React.useContext(editorStateContext);
  const { files, updateFile } = React.useContext(studioContext);
  const initialized = useMonacoWithBundle();
  const [ prefersDark ] = React.useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  const t = files.find((f) => f.name === file);

  if (!initialized) {
    return (
      <Grid
        container
        direction="row"
      >
        <Grid
          item
          xs={1}
        >
          <Skeleton
            animation="wave"
            classes={classes}
          />
        </Grid>
        <Grid
          item
          xs={10}
        >
          {Array(EDITOR_SKELETON_HEIGHT).fill(undefined).map((_, i) => (
            <Skeleton
              animation="wave"
              key={i}
            />
          ))}
        </Grid>
      </Grid>
    );
  }

  if (!t) {
    return (
      <div>
        File not found
      </div>
    );
  }

  return (
    <MonacoEditor
      saveViewState
      // defaultLanguage="typescript"
      height="inherit"
      language={t.language}
      line={0}
      options={{
        codeLens: true,
        formatOnPaste: true,
        formatOnType: true,
        lineNumbersMinChars: 1,
        minimap: {
          enabled: false,
        },
        wordWrap: 'on',
      }}
      path={t.name}
      theme={prefersDark ? 'vs-dark' : 'vs-light'}
      value={t.value}
      width="100vw"
      onChange={(v) => updateFile({
        ...t,
        value:  v ?? '',
      })}
      onMount={onMount}
    />
  );
};

export default Editor;
