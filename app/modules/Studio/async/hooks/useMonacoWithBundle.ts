import { useMonaco } from '@monaco-editor/react';
import React from 'react';

import { error } from '../../../../helpers/logging';

import { useStudioContextBundle } from './useStudioContextBundle';

type Monaco = typeof import('monaco-editor/esm/vs/editor/editor.api');

export const useMonacoWithBundle = (): boolean => {
  const context = useStudioContextBundle();
  const [initialized, setInitialized] = React.useState<Monaco[]>([]);
  const monaco = useMonaco();
  const [latest, setLatest] = React.useState(!monaco);

  React.useEffect(() => {
    if (!monaco || !context) {
      setLatest(false);

      return;
    }

    try {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });

      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        allowNonTsExtensions: true,
        lib: [
          'ES2020',
        ],
        noUnusedLocals: true,
        noUnusedParameters: true,
        strict: true,
        target: monaco.languages.typescript.ScriptTarget.ES2020,
      });

      monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

      // @ts-ignore
      const core = context.core.replaceAll('export ', '');
      monaco.languages.typescript.javascriptDefaults.addExtraLib(core, 'ts:filename/core.d.ts');
      monaco.editor.createModel(core, 'typescript', monaco.Uri.parse('ts:filename/core.d.ts'));

      for (const [name, raw] of Object.entries(context.ontologies)) {
        const declaration = JSON.parse(raw);
        monaco.languages.typescript.javascriptDefaults.addExtraLib(
          declaration,
          `ts:filename/${name}.d.ts`,
        );
        monaco.editor.createModel(
          declaration,
          'typescript',
          monaco.Uri.parse(`ts:filename/${name}.d.ts`),
        );
      }

      for (const [name, declaration] of Object.entries(context.localOntologies)) {
        monaco.languages.typescript.javascriptDefaults.addExtraLib(
          declaration,
          `ts:filename/${name}.d.ts`,
        );
        monaco.editor.createModel(
          declaration,
          'typescript',
          monaco.Uri.parse(`ts:filename/${name}.d.ts`),
        );
      }

      monaco.languages.typescript.typescriptDefaults.addExtraLib('\
      interface LangMap { en: string | DataObject, nl: string | DataObject }\
      \
      const local = (s: string) => rdf.namedNode(`${window.location.origin}/${s}`);\
      const url = (s: string) => rdf.namedNode(s);\
      const lang = (language: string, value: string) => rdf.literal(value, language);\
      const t = (langMap: LangMap>) => Object.entries(langMap).map(([k, v]) => rdf.literal(v, k));\
      const date = (s: string) => rdf.literal(new Date(s));\
    ');
    } catch (e) {
      error(e);
    }

    setInitialized([monaco, ...initialized]);
    setLatest(true);
  }, [monaco, context]);

  return latest;
};
