import React from 'react';

import useStoredState from '../../../hooks/useStoredState';
import { EditorDisplay, EditorStateContext } from '../context/EditorStateContext';

const editorDisplayFromString = (v: string | null): EditorDisplay => {
  switch (v) {
  case null:
    return EditorDisplay.Inline;
  case '0':
    return EditorDisplay.Inline;
  case '1':
    return EditorDisplay.Popout;
  case '2':
    return EditorDisplay.Hidden;
  default:
    throw new Error(`Unknown editor state '${v}'}`);
  }
};

const editorDisplayToString = (x: EditorDisplay) => x.toString();

export const useEditorStateContext = (): EditorStateContext => {
  const [documentIndex, setDocumentIndex] = useStoredState('studio.rdf.state.documentIndex', '0');
  const [resourceIndex, setResourceIndex] = useStoredState('studio.rdf.state.resourceIndex', '0');
  const [file, setFile] = useStoredState('studio.rdf.state.currentFile', 'manifest.json');
  const [editorDisplay, setEditorDisplay] = useStoredState(
    'studio.rdf.state.editorDisplay',
    EditorDisplay.Inline,
    localStorage,
    editorDisplayFromString,
    editorDisplayToString,
  );
  const [context, setContext] = React.useState<EditorStateContext>({
    documentIndex: Number.parseInt(documentIndex!),
    editorDisplay: editorDisplay ?? EditorDisplay.Inline,
    file: file!,
    resourceIndex: Number.parseInt(resourceIndex!),
    setDocumentIndex: (v: number) => setDocumentIndex(v.toString()),
    setEditorDisplay: (v: EditorDisplay) => setEditorDisplay(v),
    setFile,
    setResourceIndex: (v: number) => setResourceIndex(v.toString()),
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
    });
  }, [
    documentIndex,
    editorDisplay,
    file,
    resourceIndex,
  ]);

  return context;
};
