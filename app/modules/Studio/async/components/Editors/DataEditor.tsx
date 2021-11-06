import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import React from 'react';

import { Editable, ResourceType } from '../../context/ProjectContext';
import { manifestSchemas } from '../../lib/manifestSchema';

interface DataEditorProps {
  onChange?: (v: string | undefined) => void;
  resource: Editable;
  options?: editor.IStandaloneEditorConstructionOptions,
  onMount?: () => void;
  value: string;
}

const useStyles = makeStyles({
  inherit: {
    height: 'inherit',
  },
});

const languageForType = (type: ResourceType): string => {
  if (type === ResourceType.Manifest) {
    return 'json';
  } else if (type === ResourceType.SiteMap) {
    return 'plaintext';
  }

  return 'typescript';
};

const configureHighlighting = (monaco: Monaco) => {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    schemas: manifestSchemas,
    validate: true,
  });
};

export const DataEditor = ({
  resource,
  value,
  options,
  onChange,
  onMount,
}: DataEditorProps): JSX.Element => {
  const classes = useStyles();
  const [ prefersDark ] = React.useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  const handleMount = React.useCallback((_, monaco) => {
    configureHighlighting(monaco);

    if (onMount) {
      onMount();
    }
  }, [onMount]);

  return (
    <Grid
      container
      className={classes.inherit}
      direction="column"
    >
      <Grid
        item
        className={classes.inherit}
        xs={11}
      >
        <MonacoEditor
          saveViewState
          // defaultLanguage="typescript"
          height="inherit"
          language={languageForType(resource.type)}
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
            ...(options ?? {}),
          }}
          path={resource.name}
          theme={prefersDark ? 'vs-dark' : 'vs-light'}
          value={value}
          width="100vw"
          onChange={onChange}
          onMount={handleMount}
        />
      </Grid>
    </Grid>
  );
};
