import { Node } from '@ontologies/core';
import { LinkReduxLRSType, RenderStoreProvider } from 'link-redux';
import React from 'react';

import useJSON from '../../hooks/useJSON';
import useStoredState from '../../hooks/useStoredState';

import { EditorContextBundle } from './useEditorContextBundle';
import { useParsedSource } from './useParsedSource';

export interface BuilderContext {
  context: EditorContextBundle | undefined;
  documents: string[] | undefined;
  documentIndex: number;
  resourceIndex: number;
  lrs: LinkReduxLRSType;
  resources: Node[];
  setContext: (c: EditorContextBundle) => void;
  setDocumentIndex: (s: number) => void;
  setResourceIndex: (s: number) => void;
  setShowEditor: (b: boolean) => void;
  setSource: (s: string) => void;
  setTheme: (s: string) => void;
  showEditor: boolean;
  source: string | undefined;
  saveDocument: (id: string) => Promise<unknown>;
  theme: string | undefined;
}

export const builderContext = React.createContext<BuilderContext>({
  context: undefined,
  documentIndex: 0,
  documents: undefined,
  lrs: undefined as unknown as LinkReduxLRSType,
  resourceIndex: 0,
  resources: [],
  saveDocument: (_: string) => Promise.resolve(),
  setContext: (_: EditorContextBundle) => undefined,
  setDocumentIndex: (_: number) => undefined,
  setResourceIndex: (_: number) => undefined,
  setShowEditor: (_: boolean) => undefined,
  setSource: (_: string) => undefined,
  setTheme: (_: string) => undefined,
  showEditor: true,
  source: '',
  theme: 'common',
});

export const PageBuilderContext: React.FC = ({ children }) => {
  const [lrs, resources, source, setSource] = useParsedSource();
  const documents = useJSON<string[]>('/_libro/docs');
  const [context, setContext] = React.useState<EditorContextBundle | undefined>(undefined);
  const [documentIndex, setDocumentIndex] = useStoredState('libro.pagebuilder.documentIndex', '0');
  const [resourceIndex, setResourceIndex] = useStoredState('libro.pagebuilder.resourceIndex', '0');
  const [showEditor, setShowEditor] = useStoredState('libro.pagebuilder.showEditor', 'true');
  const document = useJSON<{ source: string }>(documents?.[Number.parseInt(documentIndex!)]);
  const [theme, setTheme] = useStoredState('libro.pagebuilder.slectedTheme', 'common');

  const saveDocument = (id: string) => (
    fetch(`/_libro/docs/${id}`, {
      body: JSON.stringify({ source }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  );

  const nextContext = () => ({
    context,
    documentIndex: Number.parseInt(documentIndex!),
    documents,
    lrs,
    resourceIndex: Number.parseInt(resourceIndex!),
    resources,
    saveDocument,
    setContext,
    setDocumentIndex: (v: number) => setDocumentIndex(v.toString()),
    setResourceIndex: (v: number) => setResourceIndex(v.toString()),
    setShowEditor: (v: boolean) => setShowEditor(v.toString()),
    setSource,
    setTheme,
    showEditor: showEditor === 'true',
    source,
    theme,
  });
  const [ctx, setCtx] = React.useState<BuilderContext>(() => nextContext());
  React.useEffect(() => {
    setCtx(nextContext());
  }, [
    context,
    documentIndex,
    resourceIndex,
    lrs,
    resources,
    source,
    setContext,
    setSource,
    setDocumentIndex,
    setResourceIndex,
    setShowEditor,
    setTheme,
    showEditor,
    theme,
  ]);

  React.useEffect(() => {
    if (document !== undefined) {
      setSource(document.source);
    }
  }, [document, document]);

  return (
    <builderContext.Provider value={ctx}>
      <RenderStoreProvider value={lrs}>
        {children}
      </RenderStoreProvider>
    </builderContext.Provider>
  );
};
