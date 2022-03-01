import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import React from 'react';

import { Editable, ResourceType } from '../../context/ProjectContext';
import { generateEditorLibs } from '../../lib/generateEditorLibs';
import { manifestSchemas } from '../../lib/manifestSchema';

interface DataEditorProps {
  onChange?: (v: string | undefined) => void;
  resource: Editable;
  options?: editor.IStandaloneEditorConstructionOptions,
  onMount?: () => void;
  value: string;
}

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

const configureLibs = (monaco: Monaco) => {
  monaco.languages.typescript.typescriptDefaults.addExtraLib(generateEditorLibs(), 'ts:lib.d.ts');
};

export const DataEditor = ({
  resource,
  value,
  options,
  onChange,
  onMount,
}: DataEditorProps): JSX.Element => {
  const [prefersDark] = React.useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  const handleMount = React.useCallback((_, monaco) => {
    configureHighlighting(monaco);
    configureLibs(monaco);

    if (onMount) {
      onMount();
    }
  }, [onMount]);

  return (
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
      width="100%"
      onChange={onChange}
      onMount={handleMount}
    />
  );
};
