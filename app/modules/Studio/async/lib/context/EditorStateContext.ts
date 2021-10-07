import React from 'react';

export enum EditorDisplay {
  Inline,
  Popout,
  Hidden,
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
}

export const editorStateContext = React.createContext<EditorStateContext>({
  documentIndex: 0,
  editorDisplay: EditorDisplay.Inline,
  file: 'manifest.json',
  resourceIndex: -1,
  setDocumentIndex: (_: number) => undefined,
  setEditorDisplay: (_: EditorDisplay) => undefined,
  setFile: (_: string) => undefined,
  setResourceIndex: (_: number) => undefined,
});
