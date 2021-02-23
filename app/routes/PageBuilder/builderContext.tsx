import { Node } from '@ontologies/core';
import { LinkReduxLRSType, RenderStoreProvider } from 'link-redux';
import React from 'react';

import { EditorContextBundle } from './useEditorContextBundle';
import { useParsedSource } from './useParsedSource';

export interface BuilderContext {
  context: EditorContextBundle | undefined;
  index: number;
  lrs: LinkReduxLRSType;
  resources: Node[];
  setContext: (c: EditorContextBundle) => void;
  setIndex: (s: number) => void;
  setSource: (s: string) => void;
  source: string | undefined;
}

export const builderContext = React.createContext<BuilderContext>({
  context: undefined,
  index: 0,
  lrs: undefined as unknown as LinkReduxLRSType,
  resources: [],
  setContext: (_: EditorContextBundle) => undefined,
  setIndex: (_: number) => undefined,
  setSource: (_: string) => undefined,
  source: '',
});

export const PageBuilderContext: React.FC = ({ children }) => {
  const [lrs, resources, source, setSource] = useParsedSource();
  const [context, setContext] = React.useState<EditorContextBundle | undefined>(undefined);
  const [index, setIndex] = React.useState<number>(0);
  const nextContext = () => ({
    context,
    index,
    lrs,
    resources,
    setContext,
    setIndex,
    setSource,
    source,
  });
  const [ctx, setCtx] = React.useState<BuilderContext>(() => nextContext());
  React.useEffect(() => {
    setCtx(nextContext());
  }, [context, index, lrs, resources, source, setContext, setSource, setIndex]);

  return (
    <builderContext.Provider value={ctx}>
      <RenderStoreProvider value={lrs}>
        {children}
      </RenderStoreProvider>
    </builderContext.Provider>
  );
};
