import MonacoEditor, { Monaco, OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import React from 'react';

import { generateEditorLibs } from '../../lib/generateEditorLibs';
import { manifestSchemas } from '../../lib/manifestSchema';
import { ResourceType } from '../../lib/types';

interface DataEditorProps {
  onChange?: (v: string | undefined) => void;
  resourceType: ResourceType;
  id?: string;
  options?: editor.IStandaloneEditorConstructionOptions,
  onMount?: () => void;
  reloadValue?: () => void;
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
  id,
  reloadValue,
  resourceType,
  value,
  options,
  onChange,
  onMount,
}: DataEditorProps): JSX.Element => {
  const [prefersDark] = React.useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  React.useEffect(() => {
    if (reloadValue) {
      reloadValue();
    }
  }, []);

  const handleMount = React.useCallback<OnMount>((_, monaco) => {
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
      language={languageForType(resourceType)}
      line={0}
      options={{
        automaticLayout: true,
        codeLens: true,
        definitionLinkOpensInPeek: true,
        formatOnPaste: true,
        formatOnType: true,
        lineNumbersMinChars: 1,
        minimap: {
          enabled: false,
        },
        wordWrap: 'on',
        ...(options ?? {}),
      }}
      path={id ?? resourceType}
      theme={prefersDark ? 'vs-dark' : 'vs-light'}
      value={value}
      width="100%"
      onChange={onChange}
      onMount={handleMount}
    />
  );
};
