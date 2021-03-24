import { Node } from '@ontologies/core';
import { LinkReduxLRSType, RenderStoreProvider } from 'link-redux';
import React from 'react';

import useJSON from '../../hooks/useJSON';

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
  showEditor: boolean;
  source: string | undefined;
  saveDocument: (id: string) => Promise<unknown>;
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
  showEditor: true,
  source: '',
});

export const PageBuilderContext: React.FC = ({ children }) => {
  const [lrs, resources, source, setSource] = useParsedSource();
  const documents = useJSON<string[]>('/_libro/docs');
  const [context, setContext] = React.useState<EditorContextBundle | undefined>(undefined);
  const [documentIndex, setDocumentIndex] = React.useState<number>(0);
  const [resourceIndex, setResourceIndex] = React.useState<number>(0);
  const [showEditor, setShowEditor] = React.useState<boolean>(true);
  const document = useJSON<{ source: string }>(documents?.[documentIndex]);

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
    documentIndex,
    documents,
    lrs,
    resourceIndex,
    resources,
    saveDocument,
    setContext,
    setDocumentIndex,
    setResourceIndex,
    setShowEditor,
    setSource,
    showEditor,
    source,
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
    showEditor,
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
