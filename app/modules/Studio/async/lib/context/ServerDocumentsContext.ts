import React from 'react';

import { LibroDocument } from '../../../components/Studio';
import { EditorFile } from '../LibroDocument';

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
