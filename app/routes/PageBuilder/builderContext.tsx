import { Node } from '@ontologies/core';
import { MULTIPLE_CHOICES } from 'http-status-codes';
import React from 'react';

import Spinner from '../../components/Spinner';
import useJSON from '../../hooks/useJSON';
import useStoredState from '../../hooks/useStoredState';

import { EditorContextBundle } from './useEditorContextBundle';
import { useParsedSource } from './useParsedSource';

export enum EditorDisplay {
  Inline,
  Popout,
  Hidden,
}

const editorDisplayFromString = (v: string | null): EditorDisplay => {
  switch (v) {
  case null: return EditorDisplay.Inline;
  case '0': return EditorDisplay.Inline;
  case '1': return EditorDisplay.Popout;
  case '2': return EditorDisplay.Hidden;
  default: throw new Error(`Unknown editor state '${v}'}`);
  }
};

const editorDisplayToString = (x: EditorDisplay) => x.toString();

export interface LibroDocument {
  manifestOverride: string;
  source: string;
}

export interface EditorFile {
  name: string;
  language: string;
  value: string;
}

export interface EditorStateContext {
  documentIndex: number;
  editorDisplay: EditorDisplay;
  resourceIndex: number;
  file: string;
  setFile: (s: string) => void;
  setDocumentIndex: (s: number) => void;
  setResourceIndex: (s: number) => void;
  setEditorDisplay: (b: EditorDisplay) => void;
  setTheme: (s: string) => void;
  theme: string | undefined;
}

export interface BuilderContext {
  context: EditorContextBundle | undefined;
  files: EditorFile[];
  resources: Node[];
  setContext: (c: EditorContextBundle) => void;
  setFiles: (v: EditorFile[]) => void;
  source: string | undefined;
  updateFile: (f: EditorFile) => void;
}

export interface ServerDocumentsContext {
  documents: string[] | undefined;
  document: LibroDocument | undefined,
  saveDocument: (id: string, source: string) => Promise<unknown>;
}

export const editorStateContext = React.createContext<EditorStateContext>({
  documentIndex: 0,
  editorDisplay: EditorDisplay.Inline,
  file: 'manifest.json',
  resourceIndex: 0,
  setDocumentIndex: (_: number) => undefined,
  setEditorDisplay: (_: EditorDisplay) => undefined,
  setFile: (_: string) => undefined,
  setResourceIndex: (_: number) => undefined,
  setTheme: (_: string) => undefined,
  theme: 'common',
});

export const serverDocumentsContext = React.createContext<ServerDocumentsContext>({
  document: undefined,
  documents: undefined,
  saveDocument: () => Promise.reject(new Error('Called save document before initialization')),
});

export const builderContext = React.createContext<BuilderContext>({
  context: undefined,
  files: [],
  resources: [],
  setContext: (_: EditorContextBundle) => undefined,
  setFiles: (_: EditorFile[]) => undefined,
  source: '',
  updateFile: (_: EditorFile) => undefined,
});

const useEditorStateContext = (): EditorStateContext => {
  const [documentIndex, setDocumentIndex] = useStoredState('libro.pagebuilder.documentIndex', '0');
  const [resourceIndex, setResourceIndex] = useStoredState('libro.pagebuilder.resourceIndex', '0');
  const [file, setFile] = useStoredState('libro.pagebuilder.currentFile', 'manifest.json');
  const [editorDisplay, setEditorDisplay] = useStoredState(
    'libro.pagebuilder.editorDisplay',
    EditorDisplay.Inline,
    localStorage,
    editorDisplayFromString,
    editorDisplayToString,
  );
  const [theme, setTheme] = useStoredState('libro.pagebuilder.selectedTheme', 'common');
  const [context, setContext] = React.useState<EditorStateContext>({
    documentIndex: Number.parseInt(documentIndex!),
    editorDisplay: editorDisplay ?? EditorDisplay.Inline,
    file: file!,
    resourceIndex: Number.parseInt(resourceIndex!),
    setDocumentIndex: (v: number) => setDocumentIndex(v.toString()),
    setEditorDisplay: (v: EditorDisplay) => setEditorDisplay(v),
    setFile,
    setResourceIndex: (v: number) => setResourceIndex(v.toString()),
    setTheme,
    theme,
  });

  React.useEffect(() => {
    setContext({
      documentIndex: Number.parseInt(documentIndex!),
      editorDisplay: editorDisplay ?? EditorDisplay.Inline,
      file: file!,
      resourceIndex: Number.parseInt(resourceIndex!),
      setDocumentIndex: (v: number) => setDocumentIndex(v.toString()),
      setEditorDisplay: (v: EditorDisplay) => setEditorDisplay(v),
      setFile,
      setResourceIndex: (v: number) => setResourceIndex(v.toString()),
      setTheme,
      theme,
    });
  }, [
    documentIndex,
    editorDisplay,
    file,
    resourceIndex,
    setDocumentIndex,
    setEditorDisplay,
    setFile,
    setResourceIndex,
    setTheme,
    theme,
  ]);

  return context;
};

const useServerDocumentsContext = (): ServerDocumentsContext => {

  const { documentIndex, theme } = useEditorStateContext();
  const documents = useJSON<string[]>('/_libro/docs');
  const document = useJSON<LibroDocument>(documents?.[documentIndex]);

  const saveDocument = React.useCallback((id: string, source: string) => (
    fetch(`/_libro/docs/${id}`, {
      body: JSON.stringify({
        manifestOverride: {
          theme: theme ?? 'default',
        },
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
  ), [theme]);

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

const filesToDoc = (files: EditorFile[]): LibroDocument => {
  const source = files.filter((f) => f.language === 'typescript')[0].value;
  const manifestOverride = files.filter((f) => f.language === 'json')[0].value;

  return {
    manifestOverride,
    source,
  };
};

const useTest = (): [BuilderContext | undefined] => {
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
  ]);
  const updateFile = React.useCallback((file: EditorFile) => {
    const next = files.slice();
    const existing = next.findIndex((f) => f.name === file.name);
    if (existing === -1) {
      next.push({ ...file });
    } else {
      next[existing] = { ...file };
    }
    setFiles(next);
  }, [files, setFiles]);
  const doc = React.useMemo(() => filesToDoc(files), [files]);

  const [_, resources] = useParsedSource(doc);
  const [context, setContext] = React.useState<EditorContextBundle | undefined>(undefined);
  const { document } = useServerDocumentsContext();

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

  const [ctx, setCtx] = React.useState<BuilderContext | undefined>();

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
    setFiles,
    setContext,
    updateFile,
  ]);

  return [ctx];
};

export const PageBuilderContext: React.FC = ({ children }) => {
  const editorStateCtx = useEditorStateContext();
  const serverDocumentsCtx = useServerDocumentsContext();
  const [ctx] = useTest();

  if (!ctx) {
    return <Spinner loading />;
  }

  return (
    <editorStateContext.Provider value={editorStateCtx}>
      <serverDocumentsContext.Provider value={serverDocumentsCtx}>
        <builderContext.Provider value={ctx}>
          {children}
        </builderContext.Provider>
      </serverDocumentsContext.Provider>
    </editorStateContext.Provider>
  );
};
