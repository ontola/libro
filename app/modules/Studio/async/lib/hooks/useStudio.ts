import React from 'react';

import { StudioContext } from '../context/StudioContext';
import { EditorFile, filesToDoc } from '../LibroDocument';

import { useResourcesFromSource } from './useResourcesFromSource';
import { useServerDocumentsContext } from './useServerDocumentsContext';
import { useSitemap } from './useSitemap';
import { EditorContextBundle } from './useStudioContextBundle';

export const useStudio = (): [StudioContext | undefined] => {
  const [context, setContext] = React.useState<EditorContextBundle | undefined>(undefined);
  const [ctx, setCtx] = React.useState<StudioContext | undefined>();
  const [files, setFiles] = React.useState<EditorFile[]>(() => [
    {
      language: 'json',
      name: 'manifest.json',
      value: '{}',
    },
    {
      language: 'typescript',
      name: 'source.ts',
      value: '[]',
    },
    {
      language: 'plaintext',
      name: 'sitemap.txt',
      value: '',
    },
  ]);

  const doc = React.useMemo(() => filesToDoc(files), [files]);

  const resources = useResourcesFromSource(doc);
  const { document } = useServerDocumentsContext();
  const sitemap = useSitemap(resources);

  const updateFile = React.useCallback((file: EditorFile) => {
    const next = files.slice();
    const existing = next.findIndex((f) => f.name === file.name);

    if (existing === -1) {
      next.push({ ...file });
    } else {
      next[existing] = { ...file };
    }

    setFiles(next);
  }, [files]);

  React.useEffect(() => {
    if (document !== undefined) {
      if (document.source) {
        updateFile({
          language: 'typescript',
          name: 'source.ts',
          value: document.source,
        });
      }

      if (document.manifestOverride) {
        updateFile({
          language: 'json',
          name: 'manifest.json',
          value: document.manifestOverride,
        });
      }
    }
  }, [document]);

  React.useEffect(() => {
    updateFile({
      language: 'plaintext',
      name: 'sitemap.txt',
      value: sitemap,
    });
  }, [sitemap]);

  React.useEffect(() => {
    setCtx({
      context,
      files,
      resources,
      setContext,
      setFiles,
      source: doc.source,
      updateFile,
    });
  }, [
    context,
    files,
    resources,
    doc,
    updateFile,
  ]);

  return [ctx];
};
