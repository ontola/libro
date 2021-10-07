import { Node } from '@ontologies/core';
import React from 'react';

import { EditorFile } from '../LibroDocument';
import { EditorContextBundle } from '../hooks/useStudioContextBundle';

export interface StudioContext {
  context: EditorContextBundle | undefined;
  files: EditorFile[];
  resources: Node[];
  setContext: (c: EditorContextBundle) => void;
  setFiles: (v: EditorFile[]) => void;
  source: string | undefined;
  updateFile: (f: EditorFile) => void;
}

export const studioContext = React.createContext<StudioContext>({
  context: undefined,
  files: [],
  resources: [],
  setContext: (_: EditorContextBundle) => undefined,
  setFiles: (_: EditorFile[]) => undefined,
  source: '',
  updateFile: (_: EditorFile) => undefined,
});
