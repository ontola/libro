import React from 'react';

export interface ServerDocumentsContext {
  documents: string[] | undefined;
  reload: () => void;
}

export const serverDocumentsContext = React.createContext<ServerDocumentsContext>({
  documents: undefined,
  reload: () => undefined,
});
