import React from 'react';

import { EditorFile, LibroDocument } from '../LibroDocument';

export interface ServerDocumentsContext {
  documents: string[] | undefined;
  document: LibroDocument | undefined,
  saveDocument: (id: string, files: EditorFile[]) => Promise<unknown>;
}

export const serverDocumentsContext = React.createContext<ServerDocumentsContext>({
  document: undefined,
  documents: undefined,
  saveDocument: () => Promise.reject(new Error('Called save document before initialization')),
});
