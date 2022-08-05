import React from 'react';

export interface ServerDocumentsContext {
  documents: string[] | undefined;
  reload: () => void;
  status: number;
}

export const serverDocumentsContext = React.createContext<ServerDocumentsContext>({
  documents: undefined,
  reload: () => undefined,
  status: 0,
});
