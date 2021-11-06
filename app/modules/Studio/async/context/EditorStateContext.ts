import React from 'react';

export enum EditorDisplay {
  Inline,
  Popout,
  Hidden,
}

export interface EditorStateContext {
  editorDisplay: EditorDisplay;
  resourceIndex: number;
  file: string;
  setFile: (s: string) => void;
  setResourceIndex: (s: number) => void;
  setEditorDisplay: (b: EditorDisplay) => void;
}

export const editorStateContext = React.createContext<EditorStateContext>({
  editorDisplay: EditorDisplay.Inline,
  file: 'manifest.json',
  resourceIndex: -1,
  setEditorDisplay: (_: EditorDisplay) => undefined,
  setFile: (_: string) => undefined,
  setResourceIndex: (_: number) => undefined,
});
