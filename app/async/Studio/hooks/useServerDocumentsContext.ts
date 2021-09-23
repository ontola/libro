import { MULTIPLE_CHOICES } from 'http-status-codes';
import React from 'react';

import useJSON from '../../../hooks/useJSON';
import { ServerDocumentsContext } from '../context/ServerDocumentsContext';
import { EditorFile, LibroDocument } from '../LibroDocument';

import { useEditorStateContext } from './useEditorStateContext';

export const useServerDocumentsContext = (): ServerDocumentsContext => {
  const { documentIndex } = useEditorStateContext();
  const documents = useJSON<string[]>('/_libro/docs');
  const document = useJSON<LibroDocument>(documents?.[documentIndex]);

  const saveDocument = React.useCallback((id: string, files: EditorFile[]) => {
    const source = files.find((f) => f.name === 'source.ts')!.value;
    const manifest = files.find((f) => f.name === 'manifest.json')!.value;
    const sitemap = files.find((f) => f.name === 'sitemap.txt')!.value;

    return (
      fetch(`/_libro/docs/${id}`, {
        body: JSON.stringify({
          manifestOverride: manifest,
          sitemap,
          source,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then((res) => {
        if (res.status >= MULTIPLE_CHOICES) {
          return Promise.reject();
        }

        return Promise.resolve();
      })
    );
  }, []);

  const [ctx, setCtx] = React.useState<ServerDocumentsContext>({
    document,
    documents,
    saveDocument,
  });

  React.useEffect(() => {
    setCtx({
      document,
      documents,
      saveDocument,
    });
  }, [document, documents, saveDocument]);

  return ctx;
};
